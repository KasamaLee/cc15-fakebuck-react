import defaultImage from '../../assets/cover.jpeg'

export default function CoverImage({ src = defaultImage }) {
    return (
        <img src={src} alt="cover" />
    )
}
