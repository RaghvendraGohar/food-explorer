import React, { useState, useCallback } from 'react';
import ReactFlow, {
  applyEdgeChanges,
  EdgeChange,
  Controls,
  Node,
  Edge,
  addEdge,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { fetchCategories, fetchMealsByCategory, fetchMealDetails } from '../api';
import Sidebar from './Sidebar';
import { Category, Meal, MealDetails } from '../types';

const initialNodes: Node[] = [
  { id: '1', position: { x: 250, y: 5 }, data: { label: 'Explore' }, type: 'default' },
];
const initialEdges: Edge[] = [];

const NodeGraph: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [mealDetails, setMealDetails] = useState<MealDetails | null>(null);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onNodeClick = async (_event: any, node: Node) => {
    if (node.data.label === 'Explore') {
      const categoriesResponse = await fetchCategories();
      const categories = categoriesResponse.categories;

      const newNodes = categories.map((category: Category, index: number) => ({
        id: `category-${index}`,
        position: { x: 200 * index + 50, y: 150 }, // Increased spacing and fixed y position
        data: { label: category.strCategory, type: 'category' }, // Added type for identification
        type: 'default',
      }));

      const newEdges = newNodes.map((newNode: { id: any; }) => ({
        id: `edge-explore-${newNode.id}`,
        source: '1', // Root node ID
        target: newNode.id,
        animated: true,
        style: { stroke: '#000000', strokeWidth: 2 }, // Style for edges
      }));

      setNodes((nds) => [...nds, ...newNodes]);
      setEdges((eds) => [...eds, ...newEdges]);
    } else if (node.data.type === 'category') { // Check if it's a category node
      const category = node.data.label; // Get the category name directly
      const mealsResponse = await fetchMealsByCategory(category);
      const meals = mealsResponse.meals;

      const newNodes = meals.map((meal: Meal, index: number) => ({
        id: `meal-${index}`,
        position: { x: 200 * index + 50, y: 300 }, // Set y position lower for meal nodes
        data: { label: meal.strMeal, id: meal.idMeal },
        type: 'default',
      }));

      const newEdges = newNodes.map((newNode: { id: any; }) => ({
        id: `edge-category-${node.id}-${newNode.id}`,
        source: node.id,
        target: newNode.id,
        animated: true,
        style: { stroke: '#000000', strokeWidth: 2 }, // Style for edges
      }));

      setNodes((nds) => [...nds, ...newNodes]);
      setEdges((eds) => [...eds, ...newEdges]);
    } else if (node.data.id) {
      const mealDetailResponse = await fetchMealDetails(node.data.id);
      setMealDetails(mealDetailResponse.meals[0]);
    }
  };

  return (
    <div style={{ fontFamily: 'Orbitron, sans-serif' }} className="flex h-screen ">
          <div style={{ width: '100%', height: '500px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
          onEdgesChange={onEdgesChange}
          onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <Sidebar meal={mealDetails} />
    </div>
  );
};

export default NodeGraph;
