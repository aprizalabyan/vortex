"use client"

import React, { useState } from 'react'
import ComponentInputText from '@/components/base/form/InputText'
import MagnifyIcon from '@/assets/icons/magnify.svg'
import ArrowTopRightIcon from '@/assets/icons/arrow-top-right.svg'
import CubesIcon from '@/assets/icons/cubes.svg'
import ListIcon from '@/assets/icons/list.svg'
import BlogCard from '@/components/blog/Card'
import BlogCardSaved from '@/components/blog/CardSaved'
import { Paginator } from 'primereact/paginator'
import { Chip } from 'primereact/chip'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'

const BlogPage = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div className='flex flex-col'>
      <section
        className='blog-header flex items-center ml-12 h-[220]'
        style={{
          background: "url('/blog-header-bg.svg') no-repeat",
          backgroundColor: "#FAFBFC",
          backgroundPosition: "95% bottom",
        }}
      >
        <div className="flex flex-col gap-2 w-1/2">
          <span className='text-2xl font-bold'>Read Blogs</span>
          <p>Displays information, visualizations, graphics and text with a display that is more interesting to explore.</p>
          <Button label='Write Blog' className='bg-black text-white w-fit rounded-lg py-2 px-4' />
        </div>
      </section>
      <section className='blog-content flex flex-col gap-4 my-4 mx-12'>
        <div className="flex items-center gap-4">
          <ComponentInputText placeholder='Search blogs' prepend={<MagnifyIcon />} />
          <div className="flex">
            <Button icon={<CubesIcon />} className='bg-yellow-300 border border-gray-200 h-10 w-10' />
            <Button icon={<ListIcon />} className='border border-gray-200 h-10 w-10' />
          </div>
        </div>
        <div className='flex'>
          <div className="main-content w-3/4 mr-4">
            <div className="grid grid-cols-3 gap-4">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
                <BlogCard key={i} />
              ))}
            </div>
            <div className="flex justify-between items-center text-sm mt-4">
              <span>Showing 7 of 56 Posts</span>
              <Paginator
                first={first}
                rows={rows}
                totalRecords={120}
                onPageChange={onPageChange}
                pt={{
                  firstPageButton: { className: 'hidden' },
                  lastPageButton: { className: 'hidden' },
                }}
              />
            </div>
          </div>
          <Divider layout='vertical' />
          <div className="side-content w-1/4">
            <span className='text-black font-medium'>Recommend Tags</span>
            <div className="flex flex-wrap gap-2 my-4">
              {[0, 1, 2, 3, 5].map((_, i) => (
                <Chip label="Action" key={i} className='text-sm py-1 px-3' />
              ))}
            </div>
            <span className='text-black font-medium'>Recenty Saved</span>
            <div className="flex flex-col gap-2 my-4">
              {[0, 1, 2, 3].map((_, i) => (
                <BlogCardSaved key={i} />
              ))}
            </div>
            <Button className='flex justify-center py-1.5 rounded-md border border-gray-200 w-full'>
              <span className='text-sm text-black font-semibold'>See all</span>
              <ArrowTopRightIcon />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogPage