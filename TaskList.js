// TaskList.js
const { useState } = React;

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const addTask = (e) => {
        e.preventDefault();
        if (newTask.trim()) {
            setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const toggleComplete = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    // Create trash icon element using Lucide
    const createTrashIcon = () => {
        const trashIcon = document.createElement('i');
        lucide.createIcons({
            icons: {
                'trash-2': trashIcon
            }
        });
        return trashIcon;
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Task List</h1>
            
            <form onSubmit={addTask} className="mb-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add a new task..."
                        className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                    <button 
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                    >
                        Add
                    </button>
                </div>
            </form>

            <ul className="space-y-2">
                {tasks.map(task => (
                    <li 
                        key={task.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleComplete(task.id)}
                                className="w-4 h-4 cursor-pointer"
                            />
                            <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                {task.text}
                            </span>
                        </div>
                        <button
                            onClick={() => deleteTask(task.id)}
                            className="text-red-500 hover:text-red-700 focus:outline-none p-1"
                        >
                            <i data-lucide="trash-2" className="w-5 h-5"></i>
                        </button>
                    </li>
                ))}
            </ul>
            
            {tasks.length === 0 && (
                <p className="text-gray-500 text-center mt-4">No tasks yet. Add some!</p>
            )}
        </div>
    );
};