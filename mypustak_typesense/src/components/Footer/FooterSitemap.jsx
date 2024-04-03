"use client"
import React, { Component, useLayoutEffect } from "react";
import {
  logout,
  login_backdropToggle,
} from "../../redux/actions/accountAction";
import { toggleGlobalLoader } from "../../redux/actions/homeAction";
import { connect } from "react-redux";
import Head from "next/head";
import { CartopenModal } from "../../redux/actions/cartAction";
import Link from "next/link";
const styles = theme => ({
  list: {
    width: 250,
  },
});

const sub_category_href = "/category/[parent_category]/[sub_category]";
const child_category_href =
  "/category/[parent_category]/[sub_category]/[child_category]";
const listcategory = {
  data: [
    {
      name: "Engineering & Medical",
      as: "/category/competitive-exams/engineering?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
      children: [
        {
          name: "AIEEE",
          url: "/category/competitive-exams/engineering/aieee?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "IIT",
          url: "/category/competitive-exams/engineering/iit?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Post Graduate(Engineering)",
          url: "/category/competitive-exams/engineering/engineering-post-graduate?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Medical",
          url: "/category/competitive-exams/engineering/medical?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "State Level",
          url: "/category/competitive-exams/engineering/state-level?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Miscellaneous",
          url: "/category/competitive-exams/engineering/others?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
      ],
    },
    {
      name: "Government Jobs",
      as: "/category/competitive-exams/government-jobs?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
      children: [
        {
          name: "Banking",
          url: "/category/competitive-exams/government-jobs/banking?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Railway",
          url: "/category/competitive-exams/government-jobs/railway?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "SSC",
          url: "/category/competitive-exams/government-jobs/ssc?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "UPSC",
          url: "/category/competitive-exams/government-jobs/upsc?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Teaching Related Exam",
          url: "/category/competitive-exams/government-jobs/teaching-related-exams?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Miscellaneous",
          url: "/category/competitive-exams/government-jobs/others?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
      ],
    },
    {
      name: "G.k & Learning",
      as: "/category/competitive-exams/general-knowledge-learning?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
      children: [],
    },
    {
      name: "International Exams",
      as: "/category/competitive-exams/international-exams?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
      children: [
        {
          name: "GMAT",
          url: "/category/competitive-exams/international-exams/gmat?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "GRE",
          url: "/category/competitive-exams/international-exams/gre?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "SAT",
          url: "/category/competitive-exams/international-exams/sat?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Miscellaneous",
          url: "/category/competitive-exams/international-exams/others?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
      ],
    },
    {
      name: "School Level",
      as: "/category/competitive-exams/school-level?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
      children: [
        {
          name: "Navodaya Vidyalaya",
          url: "/category/competitive-exams/school-level/navodaya-vidyalaya?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "NTSE",
          url: "/category/competitive-exams/school-level/ntse?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Olympiads",
          url: "/category/competitive-exams/school-level/olympiads?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Sainiks",
          url: "/category/competitive-exams/school-level/sainik-school?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Miscellaneous",
          url: "/category/competitive-exams/school-level/others?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
      ],
    },
    {
      name: "Fiction Books",
      as: "/category/fiction-non-fiction/fiction?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
      children: [
        {
          name: "Comics & Graphic novels",
          url: "/category/fiction-non-fiction/fiction/comics-graphic-novel?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Drama",
          url: "/category/fiction-non-fiction/fiction/drama?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Horror & Thriller",
          url: "/category/fiction-non-fiction/fiction/horror-and-thriller?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Literary",
          url: "/category/fiction-non-fiction/fiction/literary?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Mystery",
          url: "/category/fiction-non-fiction/fiction/mystery?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Romanace",
          url: "/category/fiction-non-fiction/fiction/romance?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Science Fiction",
          url: "/category/fiction-non-fiction/fiction/science-fiction?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Short Stories",
          url: "/category/fiction-non-fiction/fiction/short-stories?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Teens",
          url: "/category/fiction-non-fiction/fiction/teens?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
      ],
    },
    {
      name: "Non Fiction",
      as: "/category/fiction-non-fiction/non-fiction?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
      children: [
        {
          name: "Biographies",
          url: "/category/fiction-non-fiction/non-fiction/biographies?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Coffee-Table",
          url: "/category/fiction-non-fiction/non-fiction/coffee-table?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Computer & Internet",
          url: "/category/fiction-non-fiction/non-fiction/computer-and-internet?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Cooking",
          url: "/category/fiction-non-fiction/non-fiction/cooking?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Entertainment",
          url: "/category/fiction-non-fiction/non-fiction/entertainment?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Househome",
          url: "/category/fiction-non-fiction/non-fiction/househome?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Pets",
          url: "/category/fiction-non-fiction/non-fiction/pets?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Photography",
          url: "/category/fiction-non-fiction/non-fiction/photography?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Sports",
          url: "/category/fiction-non-fiction/non-fiction/sports?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Travel",
          url: "/category/fiction-non-fiction/non-fiction/travel?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
      ],
    },
    {
      name: "Fiction & Non Fiction Other",
      as: "/category/fiction-non-fiction/fiction-non-fiction-others?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
      children: [
        {
          name: "Astrology",
          url: "/category/fiction-non-fiction/fiction-non-fiction-others/astrology?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Business Management",
          url: "category/fiction-non-fiction/fiction-non-fiction-others/business-management?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Health",
          url: "/category/fiction-non-fiction/fiction-non-fiction-others/health?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "History & Politics",
          url: "/category/fiction-non-fiction/fiction-non-fiction-others/history-and-politics?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Sports & Games",
          url: "/category/fiction-non-fiction/fiction-non-fiction-others/sports-games?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Miscellaneous",
          url: "/category/fiction-non-fiction/fiction-non-fiction-others/others?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
      ],
    },
    {
      name: "Motivation & Self Help",
      as: "/category/fiction-non-fiction/motivation-self-help?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
      children: [],
    },
    {
      name: "Religion & Spirituality",
      as: "/category/fiction-non-fiction/religion-spirituality?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
      children: [
        {
          name: "Holy Books",
          url: "/category/fiction-non-fiction/religion-spirituality/holy-books?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "philosophy",
          url: "/category/fiction-non-fiction/religion-spirituality/philosophy?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Spirituality",
          url: "/category/fiction-non-fiction/religion-spirituality/spirituality?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Religions",
          url: "/category/fiction-non-fiction/religion-spirituality/religions?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Miscellaneous",
          url: "/category/fiction-non-fiction/religion-spirituality/others?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
      ],
    },
    {
      name: "Children books",
      as: "/category/school-children-books/children-books?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
      children: [
        {
          name: "Action & Adventure",
          url: "/category/school-children-books/children-books/action-and-adventure?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Activity Books",
          url: "/category/school-children-books/children-books/activity-books?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Children's literature",
          url: "/category/school-children-books/children-books/childrens-literature?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Disney Store",
          url: "/category/school-children-books/children-books/disney-store?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Fun & humor",
          url: "/category/school-children-books/children-books/fun-humour?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "History & Mythology",
          url: "/category/school-children-books/children-books/history-mythology-?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Knowledge & Learning",
          url: "/category/school-children-books/children-books/knowledge-and-learning?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Picture Book",
          url: "/category/school-children-books/children-books/picture-book?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "miscellaneous",
          url: "/category/school-children-books/children-books/others?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
      ],
    },
    {
      name: "Dictionary",
      as: "/category/school-children-books/dictionary-level-?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
      children: [
        {
          name: "English To English",
          url: "/category/school-children-books/dictionary-level-/english-to-english-?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "English To Hindi",
          url: "/category/school-children-books/dictionary-level-/english-to-hindi-?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Foreign Language",
          url: "/category/school-children-books/dictionary-level-/foreign-language?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Hindi To English",
          url: "/category/school-children-books/dictionary-level-/hindi-to-english-?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Subject Wise",
          url: "/category/school-children-books/dictionary-level-/subject-wise-?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
      ],
    },
    {
      name: "Academic",
      as: "/category/school-children-books/classes?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
      children: [
        {
          name: "KG",
          url: "/category/school-children-books/classes/kg?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Class 1",
          url: "/category/school-children-books/classes/class-1?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Class 2",
          url: "/category/school-children-books/classes/class-2?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Class 3",
          url: "/category/school-children-books/classes/class-3?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Class 4",
          url: "/category/school-children-books/classes/class-4?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Class 5",
          url: "/category/school-children-books/classes/class-5?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Class 6",
          url: "/category/school-children-books/classes/class-6?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Class 7",
          url: "/category/school-children-books/classes/class-7?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Class 8",
          url: "/category/school-children-books/classes/class-8?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Class 9",
          url: "/category/school-children-books/classes/class-9?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Class 10",
          url: "/category/school-children-books/classes/class-10?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Class 11",
          url: "/category/school-children-books/classes/class-11?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },

        {
          name: "Class 12",
          url: "/category/school-children-books/classes/class-12?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
      ],
    },
    {
      name: "NCERT",
      as: "/category/school-children-books/ncert?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
      children: [
        {
          name: "Class 1",
          url: "/category/school-children-books/ncert/class-1?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Class 2",
          url: "/category/school-children-books/ncert/class-2?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Class 3",
          url: "/category/school-children-books/ncert/class-3?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Class 4",
          url: "/category/school-children-books/ncert/class-4?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Class 5",
          url: "/category/school-children-books/ncert/class-5?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Class 6",
          url: "/category/school-children-books/ncert/class-6?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Class 7",
          url: "/category/school-children-books/ncert/class-7?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Class 8",
          url: "/category/school-children-books/ncert/class-8?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Class 9",
          url: "/category/school-children-books/ncert/class-9?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Class 10",
          url: "/category/school-children-books/ncert/class-10?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Class 11",
          url: "/category/school-children-books/ncert/class-11?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },

        {
          name: "Class 12",
          url: "/category/school-children-books/ncert/class-12?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
      ],
    },
    {
      name: "CAT",
      as: "/category/competitive-exams/cat?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
      children: [],
    },

    {
      name: "Engineering Books",
      as: "/category/university-books/engineering?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
      children: [
        {
          name: "Aeronautical",
          url: "/category/university-books/engineering/aeronautical?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Bio Technology",
          url: "/category/university-books/engineering/bio-technology?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Chemical Engineering",
          url: "/category/university-books/engineering/chemical-?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Civil",
          url: "/category/university-books/engineering/civil-?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Computer Science",
          url: "/category/university-books/engineering/computer-science?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Electrical Engineering",
          url: "/category/university-books/engineering/electrical-?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Electronics Engineering",
          url: "/category/university-books/engineering/electronics?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Marine",
          url: "/category/university-books/engineering/marine?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Mechnical",
          url: "/category/university-books/engineering/mechanical?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "miscellaneous",
          url: "/category/university-books/engineering/others?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
      ],
    },

    {
      name: "Medical Books",
      as: "/category/university-books/medical?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
      children: [
        {
          name: "Ayurveda",
          url: "/category/university-books/medical/ayurveda?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Dental",
          url: "/category/university-books/medical/dental?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "MBBS",
          url: "/category/university-books/medical/mbbs?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "PG",
          url: "/category/university-books/medical/pg?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Pharmacy",
          url: "/category/university-books/medical/pharmacy?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "miscellaneous",
          url: "/category/university-books/others?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
      ],
    },
    {
      name: "Finance",
      as: "/category/university-books/finance?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
      children: [],
    },
    {
      name: "Science & Arts",
      as: "/category/university-books/science-arts?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
      children: [
        {
          name: "B.A",
          url: "/category/university-books/science-arts/ba?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "BCA",
          url: "/category/university-books/science-arts/bca?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "B.Sc",
          url: "/category/university-books/science-arts/bsc?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "M.A",
          url: "/category/university-books/science-arts/ma?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "MCA",
          url: "/category/university-books/science-arts/mca?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "M.Sc",
          url: "/category/university-books/science-arts/msc?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
      ],
    },

    {
      name: "Others",
      as: "/category/university-books/others?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
      children: [
        {
          name: "BBA",
          url: "category/university-books/others/bba?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "B.Com",
          url: "category/university-books/others/bcom?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Law",
          url: "category/university-books/others/law?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "MBA",
          url: "category/university-books/others/mba?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "M.Com",
          url: "category/university-books/others/mcom?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Probablity & Statistics",
          url: "/category/university-books/others/probability-statistics?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "Phd",
          url: "/category/university-books/others/phd?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
        {
          name: "miscellaneous",
          url: "/category/university-books/others/others?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
        },
      ],
    },
  ],
};

class FooterSitemap extends Component {
  state = {
    category_toggle: false,
    fetched: false,
    slidemenu: "none",
    display: 0,
    Order_track_popup: false,
    Order_track_popup_status: "",
    value: "",
  };

  render() {
    const { classes } = this.props;
    const { slidemenu } = this.state;
    return (
      <div className='footer_site_maindiv '>
        <Head>
          {/* <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
            integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
            crossOrigin="anonymous"
          /> */}
        </Head>
        {listcategory.data.map(mainlist => (
          <div
            className='row'
            style={{ margin: "0px", padding: "0.1rem" }}
            key={mainlist.name}>
            <div className='col-lg-2 main_menu menulist'>
              <Link href={sub_category_href} as={mainlist.as} legacyBehavior>
                <span href=" "  style={{textDecoration:"none",cursor:"pointer"}}>{mainlist.name}</span>
              </Link>
              : &nbsp;
            </div>
            <div className='row col-lg-10 main_menu' style={{ margin: "0px" }}>
              {mainlist.children.map(Sublist => (
                <div
                  style={{
                    display: "flex",
                    textDecoration: "capitalize",
                    width: "fit-content",
                    padding: "0px",
                  }}
                  key={Sublist.name}>
                  <Link as={Sublist.url} href={child_category_href} legacyBehavior>
                    <span   style={{ textDecoration: "none", cursor: "pointer" }}>{Sublist.name}</span>
                  </Link>
                  &nbsp; | &nbsp;
                </div>
              ))}
            </div>
          </div>
        ))}

        <style jsx>
          {`
            a {
              color: #6c757d;
              text-decoration: none;
            }
            a:hover {
              color: #007bff;
            }
            .footer_site_maindiv {
              background-color: #fff;
              margin: 1rem 1rem;
              padding: 0.8rem;
              font-size: 0.8rem;
            }
            .menulist {
              text-transform: uppercase;
            }
            .main_menu {
              padding: 0.2rem;
            }
            @media screen and (max-width: 570px) {
              .footer_site_maindiv {
                padding: 0 0.3rem;
                margin-top: 1rem;
                margin-bottom: 5rem;
                margin-right: 0.6rem;
                margin-left: 0.6rem;
              }
            }
          `}
        </style>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  PopupCart: state.cartReduc.PopupCart,
  LoginBackdrop: state.accountR.LoginBackdrop,
  getuserdetails: state.userdetailsR.getuserdetails,
});
export default connect(mapStateToProps, {
  CartopenModal,
  login_backdropToggle,
  toggleGlobalLoader,
  logout,
})(FooterSitemap);
