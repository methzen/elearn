// neContainerxt
// @mui
import { styled } from '@mui/material/styles';
import { TreeView, TreeItem } from '@mui/lab';
// components
import Iconify from './iconify';

// ----------------------------------------------------------------------

const StyledTreeView = styled(TreeView)({
  height: 240,
  flexGrow: 1,
  maxWidth: 400,
});

// ----------------------------------------------------------------------

const Courses = [
  {
    SectionName: 'Docker Course',
    Chapters: [
      {
        name: 'React Course',
        id: '2',
      },
      {
        name: 'React Course',
        id: '3',
      },
      {
        name: 'React Course',
        id: '4',
      },
      {
        name: 'React Course',
        id: '1',
      },
    ],
  },
  {
    SectionName: 'React Course',
    Chapters: [
      {
        name: 'React Course',
        id: '2',
      },
      {
        name: 'React Course',
        id: '3',
      },
      {
        name: 'React Course',
        id: '4',
      },
      {
        name: 'React Course',
        id: '1',
      },
    ],
  },
];

export default function CourseMenu() {
  return (
    <StyledTreeView
      defaultCollapseIcon={<Iconify icon="eva:chevron-down-fill" />}
      defaultExpandIcon={<Iconify icon="eva:chevron-right-fill" />}
      defaultEndIcon={null}
    >
      {Courses.map((section, index) => (
        <TreeItem nodeId={section.SectionName} label={section.SectionName}>
          {section.Chapters.map((chapter) => (
            <TreeItem nodeId={`${chapter.id}`} label={chapter.name} />
          ))}
        </TreeItem>
      ))}
    </StyledTreeView>
  );
}
