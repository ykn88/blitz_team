import React, { Suspense, useState } from "react"
import Layout from "app/layouts/Layout"
import { Head, BlitzPage } from "blitz"
import Header from "app/posts/components/Header"
import Footer from "app/posts/components/Footer"
import PostList from "app/posts/components/PostList"


const PostsPage: BlitzPage = () => {

  const [cat, setCat] = useState(0)

  return (
    <div>
      <Head>
        <title>Posts</title>
      </Head>


      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
        </Suspense>
        <br />
        <div>
          <label htmlFor="select">Choose a category: </label>
          <select name="category" id="" onChange = {(e) => setCat(parseInt(e.target.value))}>
            <option value="0">All Posts</option>
            <option value="1">News</option>
            <option value="2">Food</option>
            <option value="3">Entertainment</option>
            <option value="4">Sports</option>
          </select>
        </div>
        <br />
        <br />
        <Suspense fallback={<div>Loading...</div>}>
          <PostList cat={cat}/>
        </Suspense>
        <br />
        <br />

        <Footer />
      </main>
    </div>
  )
}

PostsPage.getLayout = (page) => <Layout title={"Posts"}>{page}</Layout>

export default PostsPage