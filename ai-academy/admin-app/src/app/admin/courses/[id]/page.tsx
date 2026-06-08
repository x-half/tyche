"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  GripVertical,
  Edit2,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  FileText,
} from "lucide-react";
import Link from "next/link";

interface Lesson {
  id: string;
  title: string;
  slug: string;
  type: string;
  content: string | null;
  duration: number;
  sortOrder: number;
  isFree: boolean;
  isPreview: boolean;
}

interface Module {
  id: string;
  title: string;
  description: string | null;
  sortOrder: number;
  isFree: boolean;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  description: string | null;
  price: number;
  originalPrice: number | null;
  isFree: boolean;
  level: string;
  status: string;
  categoryId: string | null;
  tags: string | null;
  modules: Module[];
}

export default function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("content");

  // Module editing state
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [editingModuleTitle, setEditingModuleTitle] = useState("");
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set()
  );

  // Lesson editing state
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [editingLesson, setEditingLesson] = useState<Partial<Lesson>>({});

  // New module/lesson state
  const [showNewModule, setShowNewModule] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [showNewLesson, setShowNewLesson] = useState<string | null>(null);
  const [newLessonTitle, setNewLessonTitle] = useState("");

  // Lesson content editing
  const [editingContent, setEditingContent] = useState<string | null>(null);
  const [contentValue, setContentValue] = useState("");

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const res = await fetch(`/api/admin/courses/${id}`);
      if (res.ok) {
        const data = await res.json();
        setCourse(data);
        // Expand all modules by default
        setExpandedModules(
          new Set(data.modules?.map((m: Module) => m.id) || [])
        );
      }
    } catch (error) {
      console.error("Failed to fetch course:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCourse = async () => {
    if (!course) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/courses", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: course.id,
          title: course.title,
          subtitle: course.subtitle,
          description: course.description,
          price: course.price,
          originalPrice: course.originalPrice,
          isFree: course.isFree,
          level: course.level,
          status: course.status,
          categoryId: course.categoryId,
        }),
      });
      if (res.ok) {
        alert("保存成功");
      }
    } catch (error) {
      console.error("Failed to save course:", error);
      alert("保存失败");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveModule = async (moduleId: string) => {
    try {
      const res = await fetch(`/api/admin/modules/${moduleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editingModuleTitle }),
      });
      if (res.ok) {
        setEditingModuleId(null);
        fetchCourse();
      }
    } catch (error) {
      console.error("Failed to update module:", error);
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    if (!confirm("确定要删除此模块吗？模块下的所有课时也会被删除。")) return;
    try {
      const res = await fetch(`/api/admin/modules/${moduleId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchCourse();
      }
    } catch (error) {
      console.error("Failed to delete module:", error);
    }
  };

  const handleCreateModule = async () => {
    if (!newModuleTitle || !course) return;
    try {
      const res = await fetch("/api/admin/modules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newModuleTitle, courseId: course.id }),
      });
      if (res.ok) {
        setNewModuleTitle("");
        setShowNewModule(false);
        fetchCourse();
      }
    } catch (error) {
      console.error("Failed to create module:", error);
    }
  };

  const handleSaveLesson = async (lessonId: string) => {
    try {
      const res = await fetch(`/api/admin/lessons/${lessonId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingLesson),
      });
      if (res.ok) {
        setEditingLessonId(null);
        setEditingLesson({});
        fetchCourse();
      }
    } catch (error) {
      console.error("Failed to update lesson:", error);
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm("确定要删除此课时吗？")) return;
    try {
      const res = await fetch(`/api/admin/lessons/${lessonId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchCourse();
      }
    } catch (error) {
      console.error("Failed to delete lesson:", error);
    }
  };

  const handleCreateLesson = async (moduleId: string) => {
    if (!newLessonTitle) return;
    try {
      const res = await fetch("/api/admin/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newLessonTitle, moduleId, type: "text" }),
      });
      if (res.ok) {
        setNewLessonTitle("");
        setShowNewLesson(null);
        fetchCourse();
      }
    } catch (error) {
      console.error("Failed to create lesson:", error);
    }
  };

  const handleSaveContent = async (lessonId: string) => {
    try {
      const res = await fetch(`/api/admin/lessons/${lessonId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: contentValue }),
      });
      if (res.ok) {
        setEditingContent(null);
        fetchCourse();
      }
    } catch (error) {
      console.error("Failed to save content:", error);
    }
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">课程未找到</p>
        <Link href="/admin/courses" className="text-blue-600 mt-2 inline-block">
          返回课程列表
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: "content", label: "课程内容" },
    { id: "basic", label: "基本信息" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link
            href="/admin/courses"
            className="flex items-center text-gray-500 hover:text-gray-700 mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{course.title}</h1>
            <p className="text-sm text-gray-500">
              {course.modules?.length || 0} 个模块 ·{" "}
              {course.modules?.reduce(
                (sum, m) => sum + (m.lessons?.length || 0),
                0
              ) || 0}{" "}
              个课时
            </p>
          </div>
        </div>
        <button
          onClick={handleSaveCourse}
          disabled={saving}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? "保存中..." : "保存基本信息"}
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Basic Info Tab */}
      {activeTab === "basic" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                课程标题
              </label>
              <input
                type="text"
                value={course.title}
                onChange={(e) =>
                  setCourse({ ...course, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                副标题
              </label>
              <input
                type="text"
                value={course.subtitle || ""}
                onChange={(e) =>
                  setCourse({ ...course, subtitle: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                课程描述
              </label>
              <textarea
                value={course.description || ""}
                onChange={(e) =>
                  setCourse({ ...course, description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                价格 (元)
              </label>
              <input
                type="number"
                value={course.price}
                onChange={(e) =>
                  setCourse({
                    ...course,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                难度等级
              </label>
              <select
                value={course.level}
                onChange={(e) =>
                  setCourse({ ...course, level: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="beginner">入门</option>
                <option value="intermediate">进阶</option>
                <option value="advanced">高级</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                状态
              </label>
              <select
                value={course.status}
                onChange={(e) =>
                  setCourse({ ...course, status: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">草稿</option>
                <option value="published">已发布</option>
                <option value="archived">已归档</option>
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={course.isFree}
                  onChange={(e) =>
                    setCourse({ ...course, isFree: e.target.checked })
                  }
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">免费课程</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Content Tab */}
      {activeTab === "content" && (
        <div className="space-y-4">
          {/* Modules */}
          {course.modules?.map((module, mIndex) => (
            <div
              key={module.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Module Header */}
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="mr-2 p-1 hover:bg-gray-200 rounded"
                    >
                      {expandedModules.has(module.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>

                    {editingModuleId === module.id ? (
                      <div className="flex items-center flex-1">
                        <input
                          type="text"
                          value={editingModuleTitle}
                          onChange={(e) =>
                            setEditingModuleTitle(e.target.value)
                          }
                          className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveModule(module.id)}
                          className="ml-2 p-1 text-green-600 hover:bg-green-50 rounded"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setEditingModuleId(null)}
                          className="ml-1 p-1 text-gray-400 hover:bg-gray-100 rounded"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center flex-1">
                        <span className="font-medium text-gray-900">
                          模块 {mIndex + 1}: {module.title}
                        </span>
                        <button
                          onClick={() => {
                            setEditingModuleId(module.id);
                            setEditingModuleTitle(module.title);
                          }}
                          className="ml-2 p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {module.lessons?.length || 0} 课时
                    </span>
                    <button
                      onClick={() => handleDeleteModule(module.id)}
                      className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Lessons */}
              {expandedModules.has(module.id) && (
                <div className="divide-y divide-gray-100">
                  {module.lessons?.map((lesson, lIndex) => (
                    <div key={lesson.id} className="p-4">
                      {editingLessonId === lesson.id ? (
                        /* Lesson Edit Mode */
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-400 w-12">
                              {mIndex + 1}.{lIndex + 1}
                            </span>
                            <input
                              type="text"
                              value={editingLesson.title || lesson.title}
                              onChange={(e) =>
                                setEditingLesson({
                                  ...editingLesson,
                                  title: e.target.value,
                                })
                              }
                              className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              placeholder="课时标题"
                            />
                          </div>
                          <div className="flex items-center space-x-3 ml-12">
                            <select
                              value={editingLesson.type || lesson.type}
                              onChange={(e) =>
                                setEditingLesson({
                                  ...editingLesson,
                                  type: e.target.value,
                                })
                              }
                              className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                            >
                              <option value="text">文本</option>
                              <option value="quiz">测验</option>
                              <option value="code">代码</option>
                              <option value="practice">实践</option>
                            </select>
                            <label className="flex items-center text-sm">
                              <input
                                type="checkbox"
                                checked={
                                  editingLesson.isFree ?? lesson.isFree
                                }
                                onChange={(e) =>
                                  setEditingLesson({
                                    ...editingLesson,
                                    isFree: e.target.checked,
                                  })
                                }
                                className="h-3 w-3 text-blue-600 rounded mr-1"
                              />
                              免费
                            </label>
                            <div className="flex-1" />
                            <button
                              onClick={() => handleSaveLesson(lesson.id)}
                              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                            >
                              保存
                            </button>
                            <button
                              onClick={() => {
                                setEditingLessonId(null);
                                setEditingLesson({});
                              }}
                              className="px-3 py-1 border border-gray-300 text-sm rounded-lg hover:bg-gray-50"
                            >
                              取消
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Lesson Display Mode */
                        <div className="flex items-center justify-between">
                          <div className="flex items-center flex-1">
                            <span className="text-sm text-gray-400 w-12">
                              {mIndex + 1}.{lIndex + 1}
                            </span>
                            <FileText className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-gray-900">
                              {lesson.title}
                            </span>
                            {lesson.isFree && (
                              <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
                                免费
                              </span>
                            )}
                            {lesson.content && (
                              <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
                                有内容
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => {
                                setEditingContent(lesson.id);
                                setContentValue(lesson.content || "");
                              }}
                              className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded"
                            >
                              编辑内容
                            </button>
                            <button
                              onClick={() => {
                                setEditingLessonId(lesson.id);
                                setEditingLesson({
                                  title: lesson.title,
                                  type: lesson.type,
                                  isFree: lesson.isFree,
                                });
                              }}
                              className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit2 className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => handleDeleteLesson(lesson.id)}
                              className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Content Editor */}
                      {editingContent === lesson.id && (
                        <div className="mt-3 ml-12">
                          <div className="border border-gray-300 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 px-3 py-2 border-b border-gray-300 flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-700">
                                课时内容 (Markdown)
                              </span>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleSaveContent(lesson.id)}
                                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                                >
                                  保存内容
                                </button>
                                <button
                                  onClick={() => setEditingContent(null)}
                                  className="px-3 py-1 border border-gray-300 text-sm rounded hover:bg-gray-50"
                                >
                                  取消
                                </button>
                              </div>
                            </div>
                            <textarea
                              value={contentValue}
                              onChange={(e) => setContentValue(e.target.value)}
                              rows={10}
                              className="w-full px-4 py-3 focus:outline-none font-mono text-sm"
                              placeholder="输入课时内容，支持 Markdown 格式..."
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Add Lesson */}
                  {showNewLesson === module.id ? (
                    <div className="p-4 bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-400 w-12">
                          {mIndex + 1}.{(module.lessons?.length || 0) + 1}
                        </span>
                        <input
                          type="text"
                          value={newLessonTitle}
                          onChange={(e) => setNewLessonTitle(e.target.value)}
                          className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="输入课时标题"
                          autoFocus
                        />
                        <button
                          onClick={() => handleCreateLesson(module.id)}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                        >
                          添加
                        </button>
                        <button
                          onClick={() => {
                            setShowNewLesson(null);
                            setNewLessonTitle("");
                          }}
                          className="px-3 py-1 border border-gray-300 text-sm rounded-lg hover:bg-gray-50"
                        >
                          取消
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowNewLesson(module.id)}
                      className="w-full p-3 text-sm text-blue-600 hover:bg-blue-50 flex items-center justify-center"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      添加课时
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Add Module */}
          {showNewModule ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={newModuleTitle}
                  onChange={(e) => setNewModuleTitle(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="输入模块名称"
                  autoFocus
                />
                <button
                  onClick={handleCreateModule}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  创建模块
                </button>
                <button
                  onClick={() => {
                    setShowNewModule(false);
                    setNewModuleTitle("");
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  取消
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowNewModule(true)}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-600 flex items-center justify-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              添加新模块
            </button>
          )}
        </div>
      )}
    </div>
  );
}
