// next
import dynamic from 'next/dynamic';
// @mui
import { Skeleton } from '@mui/material';
//
import { EditorProps } from './types';
import { StyledEditor } from './styles';
import EditorToolbar, { formats } from './EditorToolbar';

import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

// ----------------------------------------------------------------------

declare global {
  interface Window {
    hljs: any;
  }
}

hljs.configure({
  languages: ['javascript', 'jsx', 'sh', 'bash', 'html', 'scss', 'css', 'json'],
});

if (typeof window !== 'undefined') {
  window.hljs = hljs;
}

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <Skeleton
      variant="rounded"
      sx={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: 1,
        position: 'absolute',
      }}
    />
  ),
});

// ----------------------------------------------------------------------

export default function Editor({
  id = 'minimal-quill',
  error,
  value,
  onChange,
  simple = false,
  showMedia = false,
  helperText,
  sx,
  ...other
}: EditorProps) {
  const modules = {
    toolbar: {
      container: `#${id}`,
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    syntax: true,
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <>
      <StyledEditor
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
          }),
          ...sx,
        }}
      >
        <EditorToolbar id={id} isSimple={simple} showMedia={showMedia}/>

        <ReactQuill
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder="Write something awesome..."
          {...other}
        />
      </StyledEditor>

      {helperText && helperText}
    </>
  );
}
