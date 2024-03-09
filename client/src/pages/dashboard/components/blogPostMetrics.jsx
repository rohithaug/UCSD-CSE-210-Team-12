// IMPORT LIBRARIES
import React, { useState, useEffect } from 'react';

// IMPORT ICONS
import SortButtonIcon from '@/assets/icons/sortButton';

const BlogPostMetrics = ({ adminToken }) => {
    const [blogPostMetrics, setBlogPostMetrics] = useState([]);
    const [sortDirection, setSortDirection] = useState({ key: null, ascending: true });

    useEffect(() => {
        const fetchBlogPostMetrics = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/analytics/metrics/bulk`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${adminToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch blog post metrics');
                }
                const data = await response.json();
                setBlogPostMetrics(data);

            } catch (error) {
                console.error(error);
            }
        };
        fetchBlogPostMetrics();
    }, [adminToken]);

    const sortBlogPostMetrics = (key, subkey = null) => {
        let tempBlogPostMetrics = [...blogPostMetrics];
        let newSortDirection = { key, ascending: true };

        if (key === "source") {
            if (sortDirection.key === key && sortDirection.ascending) {
                newSortDirection = { key, ascending: false };
                tempBlogPostMetrics.sort((a, b) => a.source[subkey] - b.source[subkey]);
            } else {
                tempBlogPostMetrics.sort((a, b) => b.source[subkey] - a.source[subkey]);
            }
        } else {
            if (sortDirection.key === key && sortDirection.ascending) {
                newSortDirection = { key, ascending: false };
                tempBlogPostMetrics.sort((a, b) => a[key] - b[key]);
            } else {
                tempBlogPostMetrics.sort((a, b) => b[key] - a[key]);
            }
        }

        setBlogPostMetrics(tempBlogPostMetrics);
        setSortDirection(newSortDirection);
    }

    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mb-8">
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Blog Title
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                Number of Views
                                <div 
                                    onClick={() => sortBlogPostMetrics("visits")}
                                >
                                    <SortButtonIcon />
                                </div>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                Source - Email
                                <div 
                                    onClick={() => sortBlogPostMetrics("source", "email")}
                                >
                                    <SortButtonIcon />
                                </div>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                Source - Direct
                                <div 
                                    onClick={() => sortBlogPostMetrics("source", "direct")}
                                >
                                    <SortButtonIcon />
                                </div>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                Source - Home
                                <div 
                                    onClick={() => sortBlogPostMetrics("source", "home")}
                                >
                                    <SortButtonIcon />
                                </div>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                Number of Likes
                                <div 
                                    onClick={() => sortBlogPostMetrics("likes")}
                                >
                                    <SortButtonIcon />
                                </div>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                Number of dislikes
                                <div 
                                    onClick={() => sortBlogPostMetrics("dislikes")}
                                >
                                    <SortButtonIcon />
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {blogPostMetrics.map(item => {
                        return (
                            <tr class="bg-white border-b">
                                <th scope="row" class="px-6 py-4">
                                    <a href={`dashboard/${item.blogId}`} class="font-medium text-gray-900 whitespace-nowrap hover:text-blue-900 hover:underline">{item.blogName}</a>
                                </th>
                                <td class="px-6 py-4">
                                    {item.uniqueVisit}
                                </td>
                                <td class="px-6 py-4">
                                    {item.source.email}
                                </td>
                                <td class="px-6 py-4">
                                    {item.source.direct}
                                </td>
                                <td class="px-6 py-4">
                                    {item.source.home}
                                </td>
                                <td class="px-6 py-4">
                                    {item.likes}
                                </td>
                                <td class="px-6 py-4">
                                    {item.dislikes}
                                </td>
                            </tr>    
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default BlogPostMetrics;
