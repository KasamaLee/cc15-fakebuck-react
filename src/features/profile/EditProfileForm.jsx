import Avatar from '../../components/Avatar'
import PictureForm from '../auth/PictureForm'
import CoverImage from './CoverImage'

export default function EditProfileForm() {
    return (
        <div className='flex flex-col gap-4'>
            <PictureForm title="Profile picture">
                {/* children คือ {src} ทั้งก้อน  */}
                {(src, onClick) => (
                    <div onClick={onClick}>
                        <Avatar className='h-40' src={src} />
                    </div>
                )}
            </PictureForm>

            <PictureForm title="Cover photo" >
                {(src, onClick) => (
                    <div
                        className='aspect-[3/1] overflow-hidden rounded-md flex justify-center items-center'
                        onClick={onClick}
                    >
                        <CoverImage />
                    </div>
                )}
            </PictureForm>
        </div>
    )
}
