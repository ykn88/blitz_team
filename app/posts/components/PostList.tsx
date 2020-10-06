import { Link, useQuery } from 'blitz'
import styles from './PostList.module.scss'
import getPostAll from '../queries/getPostsAll'
import getCategories from 'app/categories/queries/getCategories'


const PostList = ({cat}) => {
    const [{ posts }] = useQuery(getPostAll, { orderBy: { createdAt: "desc" } })
    const [{categories}] = useQuery(getCategories, {})
    let lists = posts
    
    cat > 0 ? lists = lists.filter(list => list.categoryId === cat) : lists = posts

    return (
        <div className={styles.blog_container}>
            {
                lists.map((post) => (
                    <Link href="/posts/[postId]" as={`/posts/${post.id}`}>
                        <a>
                            <div className={styles.blogCard}>
                                <div className={styles.cardHeader}>
                                    <img src={post.imageUrl} alt="image_Sample" className={styles.blogImg} />
                                    <div className={styles.meta}>
                                        <span className={styles.badge1}>
                                        Category: {categories.filter(category => category.id===post.categoryId).map(category => category.categoryName)}
                                        </span>
                                        <span className={styles.badge2}>{post.createdAt.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className={styles.card_content}>
                                    <h2 className={styles.blogHeader}>{post.title}</h2>
                                    <p className={styles.blogPara}>{post.text}</p>
                                </div>
                            </div>
                        </a>
                    </Link>
                ))}
        </div>
    )
}

export default PostList