const PostCard = ({ post }) => {
  return (
    <div className="rounded-md w-72 border transition-all hover:text-blue-700 hover:shadow-lg hover-scale-105 cursor-pointer">
      <img src={post.frontMatter.cover_image} alt="Cover Image" />
      <h2 className="font-semibold text-xl">{post.frontMatter.title}</h2>
    </div>
  );
};

export default PostCard;
