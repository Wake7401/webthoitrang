import React from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
    this.props.setContent(this.state.editorHtml);
  }

  cfgFont() {
    const { Quill } = ReactQuill;
    let Font = [];
    if (Quill) {
      Font = Quill.import('formats/font');
      Font.whitelist = ['arial', 'comic-sans', 'courier-new', 'georgia', 'helvetica', 'lucida'];
      Quill.register(Font, true);
    }
    return Font;
  }

  render() {
    return (
      <div className='text-editor'>
        <ReactQuill
          ref={el => {
            this.quill = el;
          }}
          onChange={this.handleChange}
          placeholder='Mô tả chi tiết...'
          modules={{
            toolbar: {
              container: [
                [
                  { header: '1' },
                  { header: '2' },
                  { header: [3, 4, 5, 6] },
                  { font: [] },
                ],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ direction: 'rtl' }],
                [{ align: [] }],
                [{ color: [] }, { background: [] }],
                ['link', 'image', 'video'],
                ['clean'],
                ['code-block'],
              ],
            },
          }}
        />
      </div>
    );
  }
}

export default MyComponent;