//T1 ReactDom
var CommentBox = React.createClass({
    render: function() {
        return (
            <div className="commentBox"> Hello, world! I am a CommentBox. </div>
        );
    }
});
//注意，原生 HTML 元素名以小写字母开头，而自定义的 React 类名以大写字母开头。
ReactDOM.render(
    <CommentBox />,
    document.getElementById('example1')
);


//T2
// tutorial2.js
var CommentList = React.createClass({
    render: function() {
        return (
            <div className="commentList">
                Hello, world! I am a CommentList.
            </div>
        );
    }
});

var CommentForm = React.createClass({
    render: function() {
        return (
            <div className="commentForm">
                Hello, world! I am a CommentForm.
            </div>
        );
    }
});

//T3
var CommentBox2 = React.createClass({
    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList />
                <CommentForm />
            </div>
        );
    }
});


ReactDOM.render(<CommentBox2 />,document.querySelector('#example2'));

// T4
var Comment = React.createClass({
    render: function() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                {this.props.children}
            </div>
        );
    }
});


var CommentList2 = React.createClass({
    render: function() {
        return (
            <div className="commentList">
                <Comment author="Pete Hunt">This is one comment</Comment>
                <Comment author="Jordan Walke">This is *another* comment</Comment>
            </div>
        );
    }
});

ReactDOM.render(<CommentList2 />,document.querySelector('#example3'));
