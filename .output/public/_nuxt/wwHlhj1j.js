import{a5 as h,a6 as i,l as n}from"./DZ62IjT-.js";import{u as m,c as l}from"./oQ2KJ8HL.js";import{u as v}from"./DWzOavYo.js";const U=h(async b=>{let t,r;const d=m();if(d.isExist())return;const o=v(),{data:{user:s},error:c}=([t,r]=i(()=>o.auth.getUser()),t=await t,r(),t);if(c||s===null)return[t,r]=i(()=>o.auth.signOut()),await t,r(),n("/auth/login");const{data:e,error:_}=([t,r]=i(()=>o.from("users").select(`
      id,
      email,
      first_name,
      last_name,
      phone,
      city,
      bio,
      cover_url,
      avatar_url,
      gender,
      birth_date,
      role:role(id, title, description),
      created_at,
      updated_at
    `).eq("id",s.id).limit(1).maybeSingle()),t=await t,r(),t),{data:p,error:w}=([t,r]=i(()=>o.from("portfolios").select(`
      id,
      image_url,
      category,
      description,
      is_public,
      likes_count,
      views_count,
      created_at,
      updated_at
    `).eq("user_id",s.id)),t=await t,r(),t);if(_)throw l();if(e===null){const{error:a}=([t,r]=i(()=>o.auth.signOut()),t=await t,r(),t);if(a)throw l();[t,r]=i(()=>n("/auth/login")),await t,r();return}const u=e.role,f=(p||[]).map(a=>({id:a.id,image_url:a.image_url?a.image_url.split("|").filter(g=>g.trim()):[],category:a.category,description:a.description,is_public:a.is_public,likes_count:a.likes_count,views_count:a.views_count,created_at:a.created_at,updated_at:a.updated_at}));d.setUser({id:e.id,email:e.email,first_name:e.first_name,last_name:e.last_name,avatar_url:e.avatar_url||void 0,cover_url:e.cover_url||void 0,phone:e.phone||void 0,city:e.city||void 0,bio:e.bio||void 0,gender:e.gender||void 0,birth_date:e.birth_date||void 0,role:{id:u.id,title:u.title,description:u.description},portfolio:f,created_at:e.created_at,updated_at:e.updated_at})});export{U as default};
