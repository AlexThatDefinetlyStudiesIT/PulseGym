// nearestNeighborAlgorithm.js

function nearestNeighborAlgorithm(nodesData, edgesData, entry) {
    const n = nodesData.length;  // количество залов
    // построение матрицы
    const Map = remapNodes(nodesData);
    const distanceMatrix = createDistanceMatrix(nodesData,edgesData,entry);
    const visited = new Array(n).fill(false);  // посещенные залы
    const route = [];  // маршрут
    let totalDistance = 0;  // длина маршрута

    // С первого зала
    let currentGym = Map.nodeMap[entry]; //упоряд, entry - факт

    visited[currentGym] = true;  // посетили
    route.push(entry);  // записали зал в маршрут

    // с первого до предпоследнего зала
    for (let i = 0; i < n - 1; i++) {
        // Найдем ближайший непосещенный зал
        let nearestGym = null;
        let nearestDistance = Infinity;

        for (let gym = 0; gym < n; gym++) {
            // находим зал из непосещенных с кратчайшим путем

            if (!visited[gym] && distanceMatrix[currentGym][gym] < nearestDistance) {
                
                nearestDistance = distanceMatrix[currentGym][gym];
                nearestGym = gym;
            }
        }
        // обновляем маршрут, его длину, посещенные залы и текущий зал
        visited[nearestGym] = true;
        const anearestGym = Map.idMap[nearestGym];//упор в факт
        route.push(anearestGym);
        totalDistance += nearestDistance;
        currentGym = nearestGym;
        
    }

    // Возвращаемся в первый зал (остальные обошли)
    totalDistance += distanceMatrix[currentGym][Map.nodeMap[entry]];
    route.push(entry);

    return { route, totalDistance };
}

// Функция для создания матрицы расстояний
    function remapNodes(nodesData) {
        const idMap = {}; 
        const nodeMap = {}; 

        // Заполняем объекты
        let index = -1;
        nodesData.forEach((node) => {
            index=index+1;// Упорядоченный идентификатор начиная с 0
            const id = node.id; // Фактический идентификатор
            idMap[index] = id;
            nodeMap[id] = index;
        });

        return { idMap, nodeMap };
    }


    function createDistanceMatrix(nodesData,edgesData) {
        const Map = remapNodes(nodesData);
        const n = Object.keys(Map.nodeMap).length;
        var distanceMatrix = Array.from({ length: n }, () => new Array(n).fill(Infinity));  // n x n

        // Заполняем матрицу расстояний
        for (const edge of edgesData) {
            const from = Map.nodeMap[edge.enter_id];
            const to = Map.nodeMap[edge.exit_id];
            const distance = edge.weight;
            // Проверяем корректность индексов
            if (from !== undefined && to !== undefined) {
                
                distanceMatrix[from][to] = distance;
                distanceMatrix[to][from] = distance;  // т.к. граф неориентированный
            }
        }
    
        return distanceMatrix;
    }

module.exports = nearestNeighborAlgorithm;
