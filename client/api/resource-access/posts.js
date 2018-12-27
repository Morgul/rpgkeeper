//----------------------------------------------------------------------------------------------------------------------
// PostResourceAccess
//----------------------------------------------------------------------------------------------------------------------

import $http from 'axios';

// Models
import PostModel from '../models/post';

//----------------------------------------------------------------------------------------------------------------------

class PostResourceAccess
{
    constructor()
    {
        this.$posts = {};
    } // end constructor

    //------------------------------------------------------------------------------------------------------------------

    _buildModel(def)
    {
        let post = this.$posts[def.post_id];
        if(post)
        {
            post.update(post);
        }
        else
        {
            post = new PostModel(def);
            this.$posts[def.post_id] = post;
        } // end if

        return post;
    } // end _buildModel

    //------------------------------------------------------------------------------------------------------------------

    async loadPosts()
    {
        const { data } = await $http.get('/news');
        return data.map((post) => this._buildModel(post));
    } // end loadPosts
} // end PostResourceAccess

//----------------------------------------------------------------------------------------------------------------------

export default new PostResourceAccess();

//----------------------------------------------------------------------------------------------------------------------
