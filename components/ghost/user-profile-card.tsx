import Image from "next/image"

interface UserProfileProps {
  username: string
  avatarSrc: string
  bottomText?: string
}

export default function UserProfileCard({ username, avatarSrc, bottomText }: UserProfileProps = {
  username: "iamEvan",
  avatarSrc: "/placeholder.svg?height=80&width=80",
  bottomText: "Sep 21, 2024",
}) {
  return (
    <section className="article-byline-content">
      <ul className="author-list instapaper_ignore">
        <li className="author-list-item">
          <a className="author-avatar" aria-label="Read more of iamEvan">
            <img className="author-profile-image" src={avatarSrc} alt="iamEvan" />
          </a>
        </li>
      </ul>

      <div className="article-byline-meta">
        <h4 className="author-name"><a>{username}</a></h4>
        <div className="byline-meta-content">
          {bottomText && <span>{bottomText}</span>}
        </div>
      </div>
    </section>
  )
}