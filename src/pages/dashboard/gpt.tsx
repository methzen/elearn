import React, { useState } from 'react';

interface GroupFormData {
  name: string;
  description: string;
  image: string;
}

interface CourseFormData {
  name: string;
  description: string;
  avatar: string;
}

interface LessonFormData {
  name: string;
  content: string;
  isVideo: boolean;
}

interface Lesson {
  name: string;
  content: string;
  isVideo: boolean;
}

const GroupCreationComponent: React.FC = () => {
  const [groupData, setGroupData] = useState<GroupFormData>({
    name: '',
    description: '',
    image: '',
  });

  const [courseData, setCourseData] = useState<CourseFormData>({
    name: '',
    description: '',
    avatar: '',
  });

  const [lessonData, setLessonData] = useState<LessonFormData>({
    name: '',
    content: '',
    isVideo: false,
  });

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGroupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGroupData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCourseInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLessonInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLessonData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLessonTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setLessonData((prevData) => ({ ...prevData, isVideo: checked }));
  };

  const handleGroupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle group data submission
    console.log('Group data:', groupData);
    // Open course form
    setIsModalOpen(true);
  };

  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle course data submission
    console.log('Course data:', courseData);
    // Open lesson form
    setIsModalOpen(true);
  };

  const handleLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle lesson data submission
    console.log('Lesson data:', lessonData);
    setLessons((prevLessons) => [...prevLessons, lessonData]);
    // Clear lesson form
    setLessonData({ name: '', content: '', isVideo: false });
  };

  const handleFinish = () => {
    // TODO: Handle finish process
    console.log('All data:', { groupData, courseData, lessons });
  };

  return (
    <div>
      <h2>Create Group</h2>
      <form onSubmit={handleGroupSubmit}>
        <label>
          Group Name:
          <input
            type="text"
            name="name"
            value={groupData.name}
            onChange={handleGroupInputChange}
          />
        </label>
        <br />
        <label>
          Group Description:
          <input
            type="text"
            name="description"
            value={groupData.description}
            onChange={handleGroupInputChange}
          />
        </label>
        <br />
        <label>
          Group Image URL:
          <input
            type="text"
            name="image"
            value={groupData.image}
            onChange={handleGroupInputChange}
          />
        </label>
        <br />
        <button type="submit">Create Group</button>
      </form>

      
      {isModalOpen && (
        <div>
          <h2>Add Course</h2>
          <form onSubmit={handleCourseSubmit}>
            <label>
              Course Name:
              <input
                type="text"
                name="name"
                value={courseData.name}
                onChange={handleCourseInputChange}
              />
            </label>
            <br />
            <label>
              Course Description:
              <input
                type="text"
                name="description"
                value={courseData.description}
                onChange={handleCourseInputChange}
              />
            </label>
            <br />
            <label>
              Course Avatar URL:
              <input
                type="text"
                name="avatar"
                value={courseData.avatar}
                onChange={handleCourseInputChange}
              />
            </label>
            <br />
            <button type="submit">Add Course</button>
          </form>
          <h2>Add Lesson</h2>
          <form onSubmit={handleLessonSubmit}>
            <label>
              Lesson Name:
              <input
                type="text"
                name="name"
                value={lessonData.name}
                onChange={handleLessonInputChange}
              />
            </label>
            <br />
            <label>
              Lesson Content:
              <input
                type="text"
                name="content"
                value={lessonData.content}
                onChange={handleLessonInputChange}
              />
            </label>
            <br />
            <label>
              Lesson Type:
              <input
                type="checkbox"
                name="isVideo"
                checked={lessonData.isVideo}
                onChange={handleLessonTypeChange}
              />
              Video Content
            </label>
            <br />
            <button type="submit">Save Lesson</button>
          </form>
        </div>
      )}
      <button onClick={handleFinish}>Finish</button>
    </div>
  );
};
export default GroupCreationComponent;