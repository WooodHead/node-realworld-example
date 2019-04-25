import * as React from 'react';
import styled from '@emotion/styled';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { Query, QueryResult } from 'react-apollo';

import routeUrls from '../../configs/routeUrls';
import Container from '../shared/Container';
import { toast } from 'react-toastify';

const { useEffect } = React;

const HomeWrapper = styled.div`
  width: 100%;
  padding-top: 32px;
  padding-bottom: 32px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const List = styled.ul`
  list-style: none;
  overflow: scroll;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-inline-end: 0;
  padding-inline-start: 0;
`;

const ListItem = styled.li`
  box-shadow: 0 2px 19px 0 rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
  background: #fff;
  min-height: 170px;
`;

const StyledPapper = styled.div`
  padding: 16px;
  min-width: calc(100% - 32px);
`;

const H1 = styled.h1`
  width: 100%;
  text-align: center;
  margin-bottom: 32px !important;
`;

const ItemTitle = styled.h3`
  margin: 0;
  margin-bottom: 12px !important;
`;

const ItemContent = styled.p`
  margin-bottom: 12px !important;
`;

const ItemImage = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 140px;
  height: 140px;
  margin-right: 16px;
  float: left;
`;

const AuthorName = styled.span`
  font-size: 18px;
`;

interface Author {
  name: string;
  id: number;
}

interface PostData {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  author: Author;
}

const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      id
      title
      content
      imageUrl
      author {
        id
        name
      }
    }
  }
`;

const POST_ADDED = gql`
  subscription {
    postAdded {
      id
      title
      content
      imageUrl
      author {
        id
        name
      }
    }
  }
`;

function Inner({ subscribeToMore, loading, error, data }: QueryResult<any, any>): any {
  useEffect(() => {
    subscribeToMore({
      document: POST_ADDED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newPost = subscriptionData.data.postAdded;
        toast.info('Notification: New Post added.');
        return { ...prev, getPosts: [...prev.getPosts, newPost] };
      }
    });
  }, []);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  const { getPosts } = data;

  return (
    <HomeWrapper>
      <Container>
        <H1>Your posts</H1>
        <List>
          {getPosts.map((post: PostData) => (
            <ListItem key={post.id}>
              <StyledPapper>
                <ItemImage style={{ backgroundImage: `url(${post.imageUrl})` }} />
                <StyledLink to={routeUrls.post.view.link(post.id)}>
                  <ItemTitle>{post.title}</ItemTitle>
                </StyledLink>
                <ItemContent>{post.content.substring(0, 400)}&#8230;</ItemContent>
                <AuthorName>Author: {post.author.name}</AuthorName>
              </StyledPapper>
            </ListItem>
          ))}
        </List>
      </Container>
    </HomeWrapper>
  );
}

function Home() {
  return <Query query={GET_POSTS}>{(data: QueryResult<any, any>) => <Inner {...data} />}</Query>;
}

export default Home;
