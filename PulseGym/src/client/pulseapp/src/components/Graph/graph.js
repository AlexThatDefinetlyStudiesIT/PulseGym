import React, { useState, useEffect } from 'react';
import Graph from 'react-vis-network-graph';
import { GymApi } from '../../api';

const GraphView = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    
    useEffect(() => {
        fetchData();
    }, []);

    const createEdgesFromHalls = (hallsData) => {
        return hallsData.map(hall => ({
            from: hall.enter_id,
            to: hall.exit_id,

        }));
    };
    const createLabelsForNodes = (nodesData) => {
        return nodesData.map(node => ({
            id: node.id,
            label: node.id.toString()
            
        }));
    };
    const removeDuplicateEdges = (edgesData) => {
        const uniqueEdges = [];
        const map = new Map();
        for (const edge of edgesData) {
            const key1 = edge.from + ',' + edge.to;
            const key2 = edge.to + ',' + edge.from;
            if (!map.has(key1) && !map.has(key2)) {
                map.set(key1, true);
                map.set(key2, true);
                uniqueEdges.push(edge);
            }
        }
        return uniqueEdges;
    };
    
    const fetchData = async () => {
        try {
            const nodesData = await GymApi.getAllGyms();
            const hallsData = await GymApi.getAllHalls();
            const edgesData = createEdgesFromHalls(hallsData);
            const labeledNodesData = createLabelsForNodes(nodesData);
            positionNodesInCircle(labeledNodesData);
            
            const uniqueEdgesData = removeDuplicateEdges(edgesData);

            setNodes(labeledNodesData);
            setEdges(uniqueEdgesData);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    };
    

    const handleResetZoom = () => {
        window.location.reload();
    };

    const options = {
        nodes: {
            shape: 'dot',
            scaling: {
                min: 5,
                max: 15,
                label: {
                    min: 8,
                    max: 30,
                    drawThreshold: 5,
                    maxVisible: 20
                }
            },
            font: {
                size: 12,
                face: 'Tahoma'
            },
            color: {
                background: '#c33149',
                border: 'black'
                
            }
            
        },
        edges: {
            width: 2,
            color: 'black',
            smooth: {
                enabled: false
            },
            arrows: {
                to: false,
                from:false 
            }
        },
        physics: false,
        interaction: {
            hideEdgesOnZoom: false,
            dragNodes: false,
            dragView: false
        },
        height: '100%',
        width: '100%',
        
    };
    
    
    function positionNodesInCircle(nodes, centerX = 0, centerY = 0) {
        const radius = nodes.length * 20; 
        const angleStep = (2 * Math.PI) / nodes.length;
        nodes.forEach((node, index) => {
            node.x = centerX + radius * Math.cos(index * angleStep);
            node.y = centerY + radius * Math.sin(index * angleStep);
        });
    }


    const data = { nodes, edges };
    

    return (
        <div className="graph-view">
            <Graph graph={data} options={options}/>
            <button className="reset-button" onClick={handleResetZoom} style={{ marginRight: '30px', marginBottom:'30px' }}>⟳</button>

        </div>
    );
};

export default GraphView;