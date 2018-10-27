// CK Editor
const Editor = document.querySelectorAll('.editor');
for (var i = 0; i < Editor.length; ++i) {
    ClassicEditor.create(Editor[i], {
        toolbar: [
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'blockQuote'
        ]
    }).catch(error => {
        console.log(error);
    });
}
