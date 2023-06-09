PGDMP         5                {            ZuckBooK %   12.15 (Ubuntu 12.15-0ubuntu0.20.04.1) %   12.15 (Ubuntu 12.15-0ubuntu0.20.04.1)     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16508    ZuckBooK    DATABASE     |   CREATE DATABASE "ZuckBooK" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'pt_BR.UTF-8' LC_CTYPE = 'pt_BR.UTF-8';
    DROP DATABASE "ZuckBooK";
                postgres    false            �            1259    16606    comments    TABLE     �   CREATE TABLE public.comments (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "userId" integer NOT NULL,
    comment text NOT NULL,
    "postedAt" timestamp without time zone
);
    DROP TABLE public.comments;
       public         heap    postgres    false            �            1259    16604    comments_id_seq    SEQUENCE     �   CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.comments_id_seq;
       public          postgres    false    207            �           0    0    comments_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;
          public          postgres    false    206            �            1259    16617 	   followers    TABLE     Z   CREATE TABLE public.followers (
    id integer NOT NULL,
    "userId" integer NOT NULL
);
    DROP TABLE public.followers;
       public         heap    postgres    false            �            1259    16615    followers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.followers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.followers_id_seq;
       public          postgres    false    209            �           0    0    followers_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.followers_id_seq OWNED BY public.followers.id;
          public          postgres    false    208            �            1259    16625 	   following    TABLE     U   CREATE TABLE public.following (
    id integer NOT NULL,
    userid text NOT NULL
);
    DROP TABLE public.following;
       public         heap    postgres    false            �            1259    16623    following_id_seq    SEQUENCE     �   CREATE SEQUENCE public.following_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.following_id_seq;
       public          postgres    false    211            �           0    0    following_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.following_id_seq OWNED BY public.following.id;
          public          postgres    false    210            �            1259    16593    posts    TABLE     �   CREATE TABLE public.posts (
    id integer NOT NULL,
    image text NOT NULL,
    "postDescription" text,
    "userId" integer NOT NULL,
    likes integer DEFAULT 0,
    "postedAt" timestamp without time zone
);
    DROP TABLE public.posts;
       public         heap    postgres    false            �            1259    16591    posts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.posts_id_seq;
       public          postgres    false    205            �           0    0    posts_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;
          public          postgres    false    204            �            1259    16580    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "imageProfile" text,
    description text,
    token text
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16578    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    203            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    202            1           2604    16609    comments id    DEFAULT     j   ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);
 :   ALTER TABLE public.comments ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    207    207            2           2604    16620    followers id    DEFAULT     l   ALTER TABLE ONLY public.followers ALTER COLUMN id SET DEFAULT nextval('public.followers_id_seq'::regclass);
 ;   ALTER TABLE public.followers ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    209    209            3           2604    16628    following id    DEFAULT     l   ALTER TABLE ONLY public.following ALTER COLUMN id SET DEFAULT nextval('public.following_id_seq'::regclass);
 ;   ALTER TABLE public.following ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    210    211            /           2604    16596    posts id    DEFAULT     d   ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);
 7   ALTER TABLE public.posts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    205    205            .           2604    16583    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    203    203            ;           2606    16614    comments comments_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_pkey;
       public            postgres    false    207            =           2606    16622    followers followers_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.followers DROP CONSTRAINT followers_pkey;
       public            postgres    false    209            ?           2606    16633    following following_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.following
    ADD CONSTRAINT following_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.following DROP CONSTRAINT following_pkey;
       public            postgres    false    211            9           2606    16602    posts posts_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_pkey;
       public            postgres    false    205            5           2606    16588    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    203            7           2606    16590    users users_token_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_token_key UNIQUE (token);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_token_key;
       public            postgres    false    203           