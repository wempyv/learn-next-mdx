import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const Home = ({ posts }) => {
  return (
    <div>index</div>
  )
}

export default Home

export async function getStaticProps() {
  // Read the pages/posts dir
  let files = fs.readdirSync(path.join('pages/posts'));

  // Get only the mdx files
  files = files.filter(file => file.split('.')[1] === 'mdx');

  // read each file and extract front matter
  const posts = await Promise.all(
    files.map(file => {
      const mdWithData = fs.readFileSync(path.join('pages/posts', file), 'utf-8');

      const { data: frontMatter } = matter(mdWithData)

      return {
        frontMatter,
        slug: file.split('.')[0]
      }
    })
  );

  return {
    props: {
      posts,
    }
  }
}