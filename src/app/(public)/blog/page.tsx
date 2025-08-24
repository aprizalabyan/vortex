"use client"

import React, { useState, useEffect, useCallback } from 'react'
import ComponentInputText from '@/components/base/form/InputText'
import MagnifyIcon from '@/assets/icons/magnify.svg'
import ArrowTopRightIcon from '@/assets/icons/arrow-top-right.svg'
import CubesIcon from '@/assets/icons/cubes.svg'
import ListIcon from '@/assets/icons/list.svg'
import BlogCard from '@/components/blog/Card'
import BlogCardSaved from '@/components/blog/CardSaved'
import { Paginator } from 'primereact/paginator'
import { Chip } from 'primereact/chip'
import { Button } from 'primereact/button'

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

const BlogPage = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(9);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendedTags, setRecommendedTags] = useState<{ name: string }[]>([]);
  const [tagsLoading, setTagsLoading] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const onPageChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      let baseUrl;

      if (activeTag) {
        baseUrl = `https://dummyjson.com/posts/tag/${activeTag}?limit=${rows}&skip=${first}`;
      } else if (searchQuery) {
        baseUrl = `https://dummyjson.com/posts/search?q=${searchQuery}&limit=${rows}&skip=${first}`;
      } else {
        baseUrl = `https://dummyjson.com/posts?limit=${rows}&skip=${first}`;
      }

      const response = await fetch(baseUrl);
      const data = await response.json();
      setPosts(data.posts);
      setTotal(data.total);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }, [first, rows, searchQuery, activeTag]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setFirst(0); // Reset pagination when searching
  };

  const fetchRecommendedTags = async () => {
    try {
      setTagsLoading(true);
      const response = await fetch('https://dummyjson.com/posts/tags');
      const data = await response.json();
      const randomTags = data.sort(() => Math.random() - 0.5).slice(0, 5);
      setRecommendedTags(randomTags);
    } catch (error) {
      console.error('Error fetching tags:', error);
    } finally {
      setTagsLoading(false);
    }
  };

  const handleTagClick = (tagName: string) => {
    setActiveTag(tagName);
    setSearchQuery(''); // Clear search when tag is selected
    setFirst(0); // Reset pagination
  };

  useEffect(() => {
    fetchRecommendedTags();
  }, []);

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ComponentInputText
              placeholder='Search blogs'
              prepend={<MagnifyIcon />}
              value={searchQuery}
              onChange={handleSearch}
            />
            <div className="flex">
              <Button icon={<CubesIcon />} className='bg-yellow-300 border border-gray-200 h-10 w-10' />
              <Button icon={<ListIcon />} className='border border-gray-200 h-10 w-10' />
            </div>
          </div>
          {activeTag && (
            <Button
              label='X Clear tag'
              className="p-button-text text-sm bg-gray-100 px-3 py-1 rounded-md"
              onClick={() => setActiveTag(null)}
            />
          )}
        </div>
        <div className='flex'>
          <div className="main-content w-3/4 mr-4">
            <div className="grid grid-cols-3 gap-4">
              {loading ? (
                <div>Loading...</div>
              ) : (
                posts.map((post) => (
                  <BlogCard
                    key={post.id}
                    title={post.title}
                    description={post.body}
                    tags={post.tags}
                    reactions={post.reactions}
                  />
                ))
              )}
            </div>
            <div className="flex justify-between items-center text-sm mt-4">
              <span>Showing {posts.length} of {total} Posts</span>
              <Paginator
                first={first}
                rows={rows}
                totalRecords={total}
                onPageChange={onPageChange}
                pt={{
                  firstPageButton: { className: 'hidden' },
                  lastPageButton: { className: 'hidden' },
                }}
              />
            </div>
          </div>
          <div className='border-l border-gray-200' />
          <div className="side-content w-1/4 ms-4">
            <span className='text-black font-medium'>Recommend Tags</span>
            <div className="flex flex-wrap gap-2 my-4">
              {tagsLoading ? (
                <div>Loading tags...</div>
              ) : (
                recommendedTags.map((tag, i) => (
                  <Chip
                    key={i}
                    label={tag.name}
                    className={`text-sm py-1 px-3 capitalize cursor-pointer hover:bg-gray-100 transition-colors
                      ${activeTag === tag.name ? 'bg-yellow-300' : ''}`}
                    onClick={() => handleTagClick(tag.name)}
                  />
                ))
              )}
            </div>
            <span className='text-black font-medium'>Recenty Saved</span>
            <div className="flex flex-col gap-4 my-4">
              {[0, 1, 2].map((_, i) => (
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