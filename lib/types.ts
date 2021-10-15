import { Dispatch, SetStateAction } from 'react';
import { IconType } from 'react-icons';

export type ALlDataProps = {
  articles: {
    frontmatter: {
      slug: string;
      title: string;
      published: string;
      updated: boolean;
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

export type ArticlesProps = {
  posts: {
    frontmatter: {
      slug: string;
      title: string;
      published: string;
      updated: boolean;
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

export type ArticleProps = {
  source: {
    compiledSource: string;
    scope: {};
  };
  frontmatter: {
    slug: string;
    title: string;
    published: string;
    updated: boolean;
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

export type FilterdArticlePosts = {
  frontmatter: {
    slug: string;
    title: string;
    published: string;
    updated: boolean;
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

export type GetArticleListFrontmatters = {
  id: number;
  title: string;
  slug: string;
  published: string;
  updated: boolean;
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

export type GetArticleSource = {
  markdown: string;
  title: string;
  published: string;
  updated: boolean;
  user: {
    id: number;
    username: string;
    portrait: {
      id: number;
      url: string;
    };
  };
  tags: string;
  cover: { id: number; url: string };
};

export type SyntaxTree = {
  tag: string;
  innerText: string;
}[];
