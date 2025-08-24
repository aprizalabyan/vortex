import React from 'react'
import { Card } from 'primereact/card'
import { Image } from 'primereact/image'
import { Avatar } from 'primereact/avatar'
import CalendarIcon from '@/assets/icons/calendar.svg'
import ThumbUpIcon from '@/assets/icons/thumb-up.svg'
import TextBubbleIcon from '@/assets/icons/text-bubble.svg'
import BookmarkIcon from '@/assets/icons/bookmark.svg'
import DotsHorizontalIcon from '@/assets/icons/dots-horizontal.svg'

interface BlogCardProps {
  title: string;
  description: string;
  tags: string[];
  reactions: any;
}

const BlogCard = ({ title, description, tags, reactions }: BlogCardProps) => {
  return (
    <Card className='shadow-none'>
      <div className="flex flex-col">
        <Image alt='img' src='https://dummyjson.com/image/360x180?text=Image+View' height='180' width='100%' />
        <div className="flex flex-col gap-2 m-4">
          <div className="flex items-center text-[12px]">
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png" shape="circle" pt={{ image: { className: 'w-6 h-6' } }} />
            <span>Jerome Bell</span>
          </div>
          <span className='font-semibold text-black'>{title}</span>
          <p className='text-sm text-gray-900'>{description.substring(0, 90) + '...'}</p>
          <div className="flex gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <CalendarIcon />
              <span>Jun 15, 08:20</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbUpIcon />
              <span>{reactions.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <TextBubbleIcon />
              <span>23</span>
            </div>
          </div>
          <div className="flex gap-1 text-black">
            <BookmarkIcon />
            <DotsHorizontalIcon />
          </div>
        </div>
      </div>

    </Card>
  )
}

export default BlogCard