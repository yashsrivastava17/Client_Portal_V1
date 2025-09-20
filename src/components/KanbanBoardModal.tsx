import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, Circle, Activity, CheckSquare, Clock, User, Flag, Calendar } from "lucide-react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "inprogress" | "review" | "done";
  priority: "low" | "medium" | "high";
  assignee: string;
  dueDate: string;
  tags: string[];
}

interface KanbanBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Brand Guidelines Update",
    description: "Update brand guidelines to reflect new visual identity and color palette changes",
    status: "todo",
    priority: "medium",
    assignee: "Sarah Chen",
    dueDate: "2024-01-15",
    tags: ["Design", "Brand"]
  },
  {
    id: "2",
    title: "Homepage Hero Section",
    description: "Implement new hero section with improved CTA and user engagement elements",
    status: "inprogress",
    priority: "high",
    assignee: "Alex Rodriguez",
    dueDate: "2024-01-10",
    tags: ["Development", "Frontend"]
  },
  {
    id: "3",
    title: "Mobile Menu Bug Fix",
    description: "Fix mobile navigation menu dropdown issue on iOS Safari browsers",
    status: "review",
    priority: "high",
    assignee: "Jordan Kim",
    dueDate: "2024-01-08",
    tags: ["Bug Fix", "Mobile"]
  },
  {
    id: "4",
    title: "User Research Analysis",
    description: "Analyze recent user interview data and create actionable insights report",
    status: "inprogress",
    priority: "medium",
    assignee: "Morgan Taylor",
    dueDate: "2024-01-12",
    tags: ["Research", "UX"]
  },
  {
    id: "5",
    title: "Design System Documentation",
    description: "Create comprehensive documentation for design system components and usage guidelines",
    status: "todo",
    priority: "low",
    assignee: "Taylor Wilson",
    dueDate: "2024-01-20",
    tags: ["Documentation", "Design System"]
  },
  {
    id: "6",
    title: "A/B Test Results Review",
    description: "Review and analyze recent A/B test results for homepage conversion optimization",
    status: "done",
    priority: "medium",
    assignee: "Casey Johnson",
    dueDate: "2024-01-05",
    tags: ["Analytics", "Optimization"]
  }
];

function TaskCard({ task }: { task: Task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700 border-red-200";
      case "medium": return "bg-orange-100 text-orange-700 border-orange-200";
      case "low": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getTagColor = (index: number) => {
    const colors = [
      "bg-blue-100 text-blue-700 border-blue-200",
      "bg-purple-100 text-purple-700 border-purple-200",
      "bg-cyan-100 text-cyan-700 border-cyan-200",
      "bg-pink-100 text-pink-700 border-pink-200"
    ];
    return colors[index % colors.length];
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-[12px] p-4 border border-gray-200 hover:border-[#8b3123] transition-colors cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md"
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif] leading-tight">
          {task.title}
        </h4>
        <Badge className={`text-[10px] px-2 py-1 ${getPriorityColor(task.priority)}`}>
          <Flag className="h-2 w-2 mr-1" />
          {task.priority}
        </Badge>
      </div>

      <p className="text-[#8b3123] text-[12px] opacity-75 mb-3 leading-relaxed line-clamp-2">
        {task.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags.map((tag, index) => (
          <Badge key={tag} className={`text-[9px] px-2 py-0.5 ${getTagColor(index)}`}>
            {tag}
          </Badge>
        ))}
      </div>

      {/* Assignee and Due Date */}
      <div className="flex items-center justify-between text-[11px] text-[#8b3123] opacity-60">
        <div className="flex items-center gap-1">
          <User className="h-3 w-3" />
          <span>{task.assignee}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

function KanbanColumn({ 
  status, 
  title, 
  icon, 
  color, 
  tasks 
}: { 
  status: Task['status']; 
  title: string; 
  icon: React.ReactNode; 
  color: string; 
  tasks: Task[] 
}) {
  return (
    <div className="flex-1 min-w-[280px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`${color} rounded-full p-1`}>
            {icon}
          </div>
          <h3 className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:Bold',_sans-serif] uppercase tracking-wide">
            {title}
          </h3>
        </div>
        <Badge variant="secondary" className="text-[11px]">
          {tasks.length}
        </Badge>
      </div>

      <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3 min-h-[400px]">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

export function KanbanBoardModal({ isOpen, onClose }: KanbanBoardModalProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as Task['priority'],
    assignee: "",
    dueDate: "",
    tags: [] as string[]
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find(task => task.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeTask = tasks.find(task => task.id === active.id);
    if (!activeTask) return;

    // Determine new status based on drop zone
    let newStatus: Task['status'] = activeTask.status;
    
    if (over.id === "todo-zone" || tasks.find(t => t.id === over.id)?.status === "todo") {
      newStatus = "todo";
    } else if (over.id === "inprogress-zone" || tasks.find(t => t.id === over.id)?.status === "inprogress") {
      newStatus = "inprogress";
    } else if (over.id === "review-zone" || tasks.find(t => t.id === over.id)?.status === "review") {
      newStatus = "review";
    } else if (over.id === "done-zone" || tasks.find(t => t.id === over.id)?.status === "done") {
      newStatus = "done";
    }

    setTasks(prev => prev.map(task => 
      task.id === active.id 
        ? { ...task, status: newStatus }
        : task
    ));

    setActiveTask(null);
  };

  const addNewTask = () => {
    if (!newTask.title.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: "todo",
      priority: newTask.priority,
      assignee: newTask.assignee || "Unassigned",
      dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
      tags: newTask.tags
    };

    setTasks(prev => [...prev, task]);
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      assignee: "",
      dueDate: "",
      tags: []
    });
    setShowAddTask(false);
  };

  const todoTasks = tasks.filter(task => task.status === "todo");
  const inProgressTasks = tasks.filter(task => task.status === "inprogress");
  const reviewTasks = tasks.filter(task => task.status === "review");
  const doneTasks = tasks.filter(task => task.status === "done");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-[#8b3123]" />
              <span>Project Kanban Board</span>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Real-time
              </Badge>
            </DialogTitle>
            <Button 
              onClick={() => setShowAddTask(true)}
              className="bg-[#8b3123] hover:bg-[#7a2e20] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </DialogHeader>

        {/* Add Task Form */}
        {showAddTask && (
          <div className="bg-gray-50 rounded-[12px] p-4 border">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
              />
              <Input
                placeholder="Assignee"
                value={newTask.assignee}
                onChange={(e) => setNewTask(prev => ({ ...prev, assignee: e.target.value }))}
              />
            </div>
            <Textarea
              placeholder="Task description"
              value={newTask.description}
              onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
              className="mb-4"
            />
            <div className="flex items-center gap-4">
              <Select value={newTask.priority} onValueChange={(value: Task['priority']) => setNewTask(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                className="w-40"
              />
              <Button onClick={addNewTask} className="bg-[#8b3123] hover:bg-[#7a2e20] text-white">
                Add Task
              </Button>
              <Button onClick={() => setShowAddTask(false)} variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex-1 flex gap-6 overflow-x-auto">
            <KanbanColumn
              status="todo"
              title="To Do"
              icon={<Circle className="h-4 w-4 text-slate-600" />}
              color="bg-slate-100"
              tasks={todoTasks}
            />
            <KanbanColumn
              status="inprogress"
              title="In Progress"
              icon={<Activity className="h-4 w-4 text-blue-600" />}
              color="bg-blue-100"
              tasks={inProgressTasks}
            />
            <KanbanColumn
              status="review"
              title="Review"
              icon={<Clock className="h-4 w-4 text-orange-600" />}
              color="bg-orange-100"
              tasks={reviewTasks}
            />
            <KanbanColumn
              status="done"
              title="Done"
              icon={<CheckSquare className="h-4 w-4 text-green-600" />}
              color="bg-green-100"
              tasks={doneTasks}
            />
          </div>

          <DragOverlay>
            {activeTask ? <TaskCard task={activeTask} /> : null}
          </DragOverlay>
        </DndContext>
      </DialogContent>
    </Dialog>
  );
}