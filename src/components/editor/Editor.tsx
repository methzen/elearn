import '../../utils/highlight';
// next
import dynamic from 'next/dynamic';
// @mui
import { Skeleton } from '@mui/material';
//
import { EditorProps } from './types';
import { StyledEditor } from './styles';
import EditorToolbar, { formats } from './EditorToolbar';
import { ReactQuillProps } from 'react-quill';
import { useCallback, useMemo, useRef } from 'react';
import uploadPostImage from '../../api/UploadPostImage';

interface MyProps extends ReactQuillProps {
  fowardRef: any;
}

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');

    return ({ fowardRef, ...props }: MyProps) => <RQ ref={fowardRef} {...props} />;
  },
  {
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
  }
);
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
  const quillRef = useRef<any>(null);

  const selectLocalImage = useCallback(() => {
    const editor = quillRef.current.getEditor();
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();
    // Listen upload local image and save to server
    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      // file type is only image.
      if (/^image\//.test(file ? file.type : '')) {
        try {
          const response = await uploadPostImage(file);
          const imgSrc = response.status === 201 ? response.data : '';
          const range = editor.getSelection();
          editor.insertEmbed(range.index, 'image', imgSrc);
          editor.setSelection(range.index + 1);
        } catch (e) {
          console.error(e);
        }
      } else {
        console.warn('You could only upload images.');
      }
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: `#${id}`,
        handlers: {
          image: selectLocalImage,
        },
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
    }),
    [id, selectLocalImage]
  );

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
        <EditorToolbar id={id} isSimple={simple} showMedia={showMedia} />

        <ReactQuill
          fowardRef={quillRef}
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
