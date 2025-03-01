import axios from "axios";

const API_URL = "https://dummyjson.com/posts";
const ADD_TASK_URL = "https://dummyjson.com/posts/add";

export const createTask = async (description: string) => {
  try {
    const response = await axios.post(
      ADD_TASK_URL,
      {
        title: description,
        userId: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const getTasks = async (limit = 10, skip = 0) => {
  try {
    const response = await axios.get(`${API_URL}?limit=${limit}&skip=${skip}`);
    return {
      posts: response.data.posts,
      total: response.data.total,
    };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const searchPosts = async (query: string) => {
  try {
    const response = await axios.get(`${API_URL}/search?q=${query}`);
    return response.data.posts;
  } catch (error) {
    console.error("Error searching posts:", error);
    throw error;
  }
};

export const updatePost = async (id: number, title: string, tags: string[]) => {
  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      {
        title,
        tags,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

export const deletePost = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};
