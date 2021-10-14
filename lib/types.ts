import { Dispatch, SetStateAction } from 'react';
import { IconType } from 'react-icons';

export type ALlDataProps = {
  blogPosts: {
    frontmatter: {
      slug: string;
      title: string;
      published: string;
      updated?: string;
      author: string;
      tags?: string;
      cover: string;
    };
    plaiceholder: {
      img: {
        src: string;
        width: number;
        height: number;
        type: string;
        blurDataURL: string;
      };
    };
  }[];
  projects: {
    frontmatter: {
      slug: string;
      title: string;
      tags?: string;
      cover: string;
    };
    plaiceholder: {
      img: {
        src: string;
        width: number;
        height: number;
        type: string;
        blurDataURL: string;
      };
    };
  }[];
};

export type BlogPostsProps = {
  posts: {
    frontmatter: {
      slug: string;
      title: string;
      published: string;
      updated?: string;
      author: string;
      tags?: string;
      cover: string;
    };
    plaiceholder: {
      img: {
        src: string;
        width: number;
        height: number;
        type: string;
        blurDataURL: string;
      };
    };
  }[];
};

export type BlogPostProps = {
  source: {
    compiledSource: string;
    scope: {};
  };
  frontmatter: {
    slug: string;
    title: string;
    published: string;
    updated?: string;
    author: { name: string; portrait: string };
    tags?: string;
  };
  plaiceholders: {
    cover: {
      src: string;
      width: number;
      height: number;
      type: string;
      blurDataURL: string;
    };
    portrait: {
      src: string;
      width: number;
      height: number;
      type: string;
      blurDataURL: string;
    };
  };
};

export type ProjectsProps = {
  projects: {
    frontmatter: {
      slug: string;
      title: string;
      tags?: string;
      cover: string;
    };
    plaiceholder: {
      img: {
        src: string;
        width: number;
        height: number;
        type: string;
        blurDataURL: string;
      };
    };
  }[];
};

export type FilterdBlogPosts = {
  frontmatter: {
    slug: string;
    title: string;
    published: string;
    updated?: string;
    author: string;
    tags?: string;
    cover: string;
  };
  plaiceholder: {
    img: {
      src: string;
      width: number;
      height: number;
      type: string;
      blurDataURL: string;
    };
  };
}[];

export type FilterdProjects = {
  frontmatter: {
    slug: string;
    title: string;
    tags?: string;
    cover: string;
  };
  plaiceholder: {
    img: {
      src: string;
      width: number;
      height: number;
      type: string;
      blurDataURL: string;
    };
  };
}[];

export type PagenationProps = {
  count: number;
  contentPerPage: number;
  totalPageCount: number[];
  prevPage: () => void;
  nextPage: () => void;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  minContentIndex: number;
  maxContentIndex: number;
};

export type NavLinks = {
  id: number;
  title: string;
  path: string;
}[];

export type FooterLinks = {
  id: number;
  label: string;
  url: string;
  icon: IconType;
}[];

export type GetBlogPostsListFrontmatters = {
  id: number;
  title: string;
  slug: string;
  published: string;
  updated: string;
  user: {
    id: number;
    username: string;
    portrait: {
      id: number;
      url: string;
    };
  };
  tags: string;
  cover: {
    id: number;
    url: string;
  };
};

export type GetBlogPostsListSortedPosts = {
  frontmatter: {
    published: number;
    updated: number;
  };
};

export type SyntaxTree = {
  tag: string;
  innerText: string;
}[];
