import { Storage, Context, generateEvent } from '@massalabs/massa-as-sdk';

/**
 * This function is meant to be called only one time: when the contract is deployed.
 *
 * @param _ - not used
 */
export function constructor(_: StaticArray<u8>): void {
  // This line is important. It ensures that this function can't be called in the future.
  // If you remove this check, someone could call your constructor function and reset your smart contract.
  if (!Context.isDeployingContract()) {
    return;
  }
  const nBlogPosts = 0;
  // Set the initial value of N_BLOG_POSTS to 0 in the storage of the contract
  Storage.set('N_BLOG_POSTS', nBlogPosts.toString());
  // This function is used to emit an event to the blockchain
  generateEvent('Blog initiated');
}

// @ts-ignore: decorator
@massaExport()
export function post(post: string): string {
  let postLastIndex = 0;
  if (Storage.get<string>('N_BLOG_POSTS') !== '') {
    postLastIndex = parseInt(Storage.get('N_BLOG_POSTS')) as i32;
  }
  postLastIndex += 1;
  // Store the post in the storage of the contract with the key POST_postIndex
  // The keys will have the following syntaxes: POST_1, POST_2, POST_3, etc.
  Storage.set(blogKey(postLastIndex.toString()), post);
  // Incrementing the value of N_BLOG_POSTS in the storage of the contract
  Storage.set('N_BLOG_POSTS', postLastIndex.toString());
  return post;
}

// @ts-ignore: decorator
@massaExport()
export function deletePost(postIndex: string): void {
  // Delete the post from the storage of the contract by setting its value to an empty string
  Storage.set(blogKey(postIndex), '');
}

// @ts-ignore: decorator
@massaExport()
// This function is used within the contract to generate the key of a post that will be stored in the storage
export function blogKey(postIndex: string): string {
  return 'POST_' + postIndex;
}
