import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import PostCard from "../components/PostCard";

const Home = ({ posts }) => {
  return (
    <div className="container w-[80%] md:w-[60%] mx-auto">
      <h1 className="text-blue-700 text-3xl font-bold my-12">My Blog</h1>
      <div className="posts md:grid md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link href={`/posts/${post.slug}`} key={post.slug}>
            <a>
              <PostCard post={post} />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  // Read the pages/posts dir
  let files = fs.readdirSync(path.join("pages/posts"));

  // Get only the mdx files
  files = files.filter((file) => file.split(".")[1] === "mdx");

  // read each file and extract front matter
  const posts = await Promise.all(
    files.map((file) => {
      const mdWithData = fs.readFileSync(
        path.join("pages/posts", file),
        "utf-8"
      );

      const { data: frontMatter } = matter(mdWithData);

      return {
        frontMatter,
        slug: file.split(".")[0],
      };
    })
  );

  return {
    props: {
      posts,
    },
  };
}
