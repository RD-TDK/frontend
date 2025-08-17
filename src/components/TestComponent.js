// src/components/TestComponent.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext }          from '../context/UserContext';
import ImageSelector            from './ImageSelector';
import Prompt                   from './Prompt';
import StaticFeedback           from './StaticFeedback';
import ResultSummary            from './ResultSummary';
import PostTestResult           from './PostTestResult';
import Navbar                   from './Navbar';
import Footer                   from './Footer';

// —— 图片池放到组件外，务必确保每个 AI 图片都带 .feature 字段 ——
const IMAGES = [
    // 真实图，不需 feature
    { src: '/images/real/00000.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00001.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00002.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00003.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00004.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00005.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00006.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00007.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00008.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00009.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00010.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00011.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00012.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00013.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00014.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00015.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00016.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00017.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00018.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00019.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00020.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00021.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00022.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00023.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00024.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00025.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00026.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00027.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00028.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00029.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00030.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00031.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00032.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00033.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00034.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00035.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00036.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00037.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00038.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00039.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00040.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00041.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00042.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00043.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00044.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00045.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00046.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00047.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00048.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00049.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00050.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00051.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00052.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00053.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00054.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00055.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00056.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00057.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00058.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00059.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    // AI 图，带 feature
    { src: '/images/features/asymmetries/asy_01.png', feature: 'asymmetries', isReal: false, feedback: 'AI generated - Notice the facial asymmetry and unrealistic proportions.', explanationImage: '/images/features/ex_asy/asy_ex_01.png' },
    { src: '/images/features/asymmetries/asy_02.png', feature: 'asymmetries', isReal: false, feedback: 'AI generated - Look for the unnatural facial symmetry and artificial proportions.', explanationImage: '/images/features/ex_asy/asy_ex_02.png' },
    { src: '/images/features/asymmetries/asy_03.png', feature: 'asymmetries', isReal: false, feedback: 'AI generated - Check the unrealistic facial features and artificial symmetry.', explanationImage: '/images/features/ex_asy/asy_ex_03.png' },
    { src: '/images/features/asymmetries/asy_04.png', feature: 'asymmetries', isReal: false, feedback: 'AI generated - Notice the artificial facial proportions and unrealistic symmetry.', explanationImage: '/images/features/ex_asy/asy_ex_04.png' },
    { src: '/images/features/asymmetries/asy_05.png', feature: 'asymmetries', isReal: false, feedback: 'AI generated - Look for the unnatural facial asymmetry and artificial features.', explanationImage: '/images/features/ex_asy/asy_ex_05.png' },
    { src: '/images/features/asymmetries/asy_06.png', feature: 'asymmetries', isReal: false, feedback: 'AI generated - Check the unrealistic facial proportions and artificial symmetry.', explanationImage: '/images/features/ex_asy/asy_ex_06.png' },
    { src: '/images/features/asymmetries/asy_07.png', feature: 'asymmetries', isReal: false, feedback: 'AI generated - Notice the artificial facial features and unnatural proportions.', explanationImage: '/images/features/ex_asy/asy_ex_07.png' },
    { src: '/images/features/asymmetries/asy_08.png', feature: 'asymmetries', isReal: false, feedback: 'AI generated - Look for the unrealistic facial symmetry and artificial proportions.', explanationImage: '/images/features/ex_asy/asy_ex_08.png' },
    { src: '/images/features/asymmetries/asy_09.png', feature: 'asymmetries', isReal: false, feedback: 'AI generated - Check the unnatural facial asymmetry and artificial features.', explanationImage: '/images/features/ex_asy/asy_ex_09.png' },
    { src: '/images/features/asymmetries/asy_10.png', feature: 'asymmetries', isReal: false, feedback: 'AI generated - Notice the artificial facial proportions and unrealistic symmetry.', explanationImage: '/images/features/ex_asy/asy_ex_10.png' },
    { src: '/images/features/asymmetries/asy_11.png', feature: 'asymmetries', isReal: false, feedback: 'AI generated - Look for the unnatural facial features and artificial proportions.', explanationImage: '/images/features/ex_asy/asy_ex_11.png' },
    { src: '/images/features/asymmetries/asy_12.png', feature: 'asymmetries', isReal: false, feedback: 'AI generated - Check the unrealistic facial symmetry and artificial asymmetry.', explanationImage: '/images/features/ex_asy/asy_ex_12.png' },
    { src: '/images/features/asymmetries/asy_13.png', feature: 'asymmetries', isReal: false, feedback: 'AI generated - Notice the artificial facial proportions and unnatural features.', explanationImage: '/images/features/ex_asy/asy_ex_13.png' },
    { src: '/images/features/asymmetries/asy_14.png', feature: 'asymmetries', isReal: false, feedback: 'AI generated - Look for the unrealistic facial asymmetry and artificial symmetry.', explanationImage: '/images/features/ex_asy/asy_ex_14.png' },
    { src: '/images/features/asymmetries/asy_15.png', feature: 'asymmetries', isReal: false, feedback: 'AI generated - Check the unnatural facial proportions and artificial features.', explanationImage: '/images/features/ex_asy/asy_ex_15.png' },
    { src: '/images/features/asymmetries/asy_16.png', feature: 'asymmetries', isReal: false, feedback: 'AI generated - Notice the artificial facial symmetry and unrealistic proportions.', explanationImage: '/images/features/ex_asy/asy_ex_16.png' },
    { src: '/images/features/asymmetries/asy_17.png', feature: 'asymmetries', isReal: false, feedback: 'AI generated - Look for the unnatural facial asymmetry and artificial proportions.', explanationImage: '/images/features/ex_asy/asy_ex_17.png' },
    { src: '/images/features/asymmetries/asy_18.png', feature: 'asymmetries', isReal: false, feedback: 'AI generated - Check the unrealistic facial features and artificial symmetry.', explanationImage: '/images/features/ex_asy/asy_ex_18.png' },
    { src: '/images/features/asymmetries/asy_19.png', feature: 'asymmetries', isReal: false, feedback: 'AI generated - Notice the artificial facial proportions and unnatural asymmetry.', explanationImage: '/images/features/ex_asy/asy_ex_19.png' },
    { src: '/images/features/asymmetries/asy_20.png', feature: 'asymmetries', isReal: false, feedback: 'AI generated - Look for the unrealistic facial symmetry and artificial features.', explanationImage: '/images/features/ex_asy/asy_ex_20.png' },
    
    // Background AI images
    { src: '/images/features/background/ai_bac_01.png', feature: 'background', isReal: false, feedback: 'AI generated - Notice the artificial background patterns and unrealistic textures.', explanationImage: '/images/features/ex_bac/ai_bac_ex_01.png' },
    { src: '/images/features/background/ai_bac_02.png', feature: 'background', isReal: false, feedback: 'AI generated - Look for the unnaturally smooth background elements and artificial blending.', explanationImage: '/images/features/ex_bac/ai_bac_ex_02.png' },
    { src: '/images/features/background/ai_bac_03.png', feature: 'background', isReal: false, feedback: 'AI generated - Check the unrealistic background textures and artificial patterns.', explanationImage: '/images/features/ex_bac/ai_bac_ex_03.png' },
    { src: '/images/features/background/ai_bac_04.png', feature: 'background', isReal: false, feedback: 'AI generated - Notice the artificial background elements and texture inconsistencies.', explanationImage: '/images/features/ex_bac/ai_bac_ex_04.png' },
    { src: '/images/features/background/ai_bac_05.png', feature: 'background', isReal: false, feedback: 'AI generated - Look for the unnaturally smooth background and artificial details.', explanationImage: '/images/features/ex_bac/ai_bac_ex_05.png' },
    { src: '/images/features/background/ai_bac_06.png', feature: 'background', isReal: false, feedback: 'AI generated - Check the unrealistic background patterns and texture uniformity.', explanationImage: '/images/features/ex_bac/ai_bac_ex_06.png' },
    { src: '/images/features/background/ai_bac_07.png', feature: 'background', isReal: false, feedback: 'AI generated - Notice the artificial background elements and color blending issues.', explanationImage: '/images/features/ex_bac/ai_bac_ex_07.png' },
    { src: '/images/features/background/ai_bac_08.png', feature: 'background', isReal: false, feedback: 'AI generated - Look for the unnaturally smooth background textures and artificial patterns.', explanationImage: '/images/features/ex_bac/ai_bac_ex_08.png' },
    { src: '/images/features/background/ai_bac_09.png', feature: 'background', isReal: false, feedback: 'AI generated - Check the unrealistic background details and texture inconsistencies.', explanationImage: '/images/features/ex_bac/ai_bac_ex_09.png' },
    { src: '/images/features/background/ai_bac_10.png', feature: 'background', isReal: false, feedback: 'AI generated - Notice the artificial background elements and color bleeding effects.', explanationImage: '/images/features/ex_bac/ai_bac_ex_10.png' },
    { src: '/images/features/background/ai_bac_11.png', feature: 'background', isReal: false, feedback: 'AI generated - Look for the unnaturally smooth background and artificial texture patterns.', explanationImage: '/images/features/ex_bac/ai_bac_ex_11.png' },
    { src: '/images/features/background/ai_bac_12.png', feature: 'background', isReal: false, feedback: 'AI generated - Check the unrealistic background patterns and artificial blending.', explanationImage: '/images/features/ex_bac/ai_bac_ex_12.png' },
    { src: '/images/features/background/ai_bac_13.png', feature: 'background', isReal: false, feedback: 'AI generated - Notice the artificial background elements and texture uniformity issues.', explanationImage: '/images/features/ex_bac/ai_bac_ex_13.png' },
    { src: '/images/features/background/ai_bac_14.png', feature: 'background', isReal: false, feedback: 'AI generated - Look for the unnaturally smooth background and artificial details.', explanationImage: '/images/features/ex_bac/ai_bac_ex_14.png' },
    { src: '/images/features/background/ai_bac_15.png', feature: 'background', isReal: false, feedback: 'AI generated - Check the unrealistic background textures and color blending problems.', explanationImage: '/images/features/ex_bac/ai_bac_ex_15.png' },
    { src: '/images/features/background/ai_bac_16.png', feature: 'background', isReal: false, feedback: 'AI generated - Notice the artificial background patterns and texture inconsistencies.', explanationImage: '/images/features/ex_bac/ai_bac_ex_16.png' },
    { src: '/images/features/background/ai_bac_17.png', feature: 'background', isReal: false, feedback: 'AI generated - Look for the unnaturally smooth background elements and artificial patterns.', explanationImage: '/images/features/ex_bac/ai_bac_ex_17.png' },
    { src: '/images/features/background/ai_bac_18.png', feature: 'background', isReal: false, feedback: 'AI generated - Check the unrealistic background textures and artificial blending.', explanationImage: '/images/features/ex_bac/ai_bac_ex_18.png' },
    { src: '/images/features/background/ai_bac_19.png', feature: 'background', isReal: false, feedback: 'AI generated - Notice the artificial background elements and color bleeding from foreground.', explanationImage: '/images/features/ex_bac/ai_bac_ex_19.png' },
    { src: '/images/features/background/ai_bac_20.png', feature: 'background', isReal: false, feedback: 'AI generated - Look for the unnaturally smooth background and artificial texture patterns.', explanationImage: '/images/features/ex_bac/ai_bac_ex_20.png' },
    
    // Hair AI images
    { src: '/images/features/hair/ai_hair_01.png', feature: 'hair', isReal: false, feedback: 'AI generated - Notice the unnaturally smooth hair texture.', explanationImage: '/images/features/ex_hair/ai_hair_ex_01.png' },
    { src: '/images/features/hair/ai_hair_02.png', feature: 'hair', isReal: false, feedback: 'AI generated - Look for the overly uniform hair strands and artificial smoothness.', explanationImage: '/images/features/ex_hair/ai_hair_ex_02.png' },
    { src: '/images/features/hair/ai_hair_03.png', feature: 'hair', isReal: false, feedback: 'AI generated - Check the unrealistic hair flow and texture inconsistencies.', explanationImage: '/images/features/ex_hair/ai_hair_ex_03.png' },
    { src: '/images/features/hair/ai_hair_04.png', feature: 'hair', isReal: false, feedback: 'AI generated - Notice the artificial hair patterns and color blending issues.', explanationImage: '/images/features/ex_hair/ai_hair_ex_04.png' },
    { src: '/images/features/hair/ai_hair_05.png', feature: 'hair', isReal: false, feedback: 'AI generated - Look for the unnaturally smooth hair edges and texture uniformity.', explanationImage: '/images/features/ex_hair/ai_hair_ex_05.png' },
    { src: '/images/features/hair/ai_hair_06.png', feature: 'hair', isReal: false, feedback: 'AI generated - Check for artificial hair flow and unrealistic texture patterns.', explanationImage: '/images/features/ex_hair/ai_hair_ex_06.png' },
    { src: '/images/features/hair/ai_hair_07.png', feature: 'hair', isReal: false, feedback: 'AI generated - Notice the overly smooth hair texture and artificial strand patterns.', explanationImage: '/images/features/ex_hair/ai_hair_ex_07.png' },
    { src: '/images/features/hair/ai_hair_08.png', feature: 'hair', isReal: false, feedback: 'AI generated - Look for the unrealistic hair texture and color bleeding effects.', explanationImage: '/images/features/ex_hair/ai_hair_ex_08.png' },
    { src: '/images/features/hair/ai_hair_09.png', feature: 'hair', isReal: false, feedback: 'AI generated - Check the artificial hair patterns and unnaturally smooth texture.', explanationImage: '/images/features/ex_hair/ai_hair_ex_09.png' },
    { src: '/images/features/hair/ai_hair_10.png', feature: 'hair', isReal: false, feedback: 'AI generated - Notice the uniform hair strands and unrealistic texture flow.', explanationImage: '/images/features/ex_hair/ai_hair_ex_10.png' },
    { src: '/images/features/hair/ai_hair_11.png', feature: 'hair', isReal: false, feedback: 'AI generated - Look for the artificial hair texture and color blending issues.', explanationImage: '/images/features/ex_hair/ai_hair_ex_11.png' },
    { src: '/images/features/hair/ai_hair_12.png', feature: 'hair', isReal: false, feedback: 'AI generated - Check the unnaturally smooth hair edges and texture uniformity.', explanationImage: '/images/features/ex_hair/ai_hair_ex_12.png' },
    { src: '/images/features/hair/ai_hair_13.png', feature: 'hair', isReal: false, feedback: 'AI generated - Notice the unrealistic hair patterns and artificial smoothness.', explanationImage: '/images/features/ex_hair/ai_hair_ex_13.png' },
    { src: '/images/features/hair/ai_hair_14.png', feature: 'hair', isReal: false, feedback: 'AI generated - Look for the artificial hair flow and texture inconsistencies.', explanationImage: '/images/features/ex_hair/ai_hair_ex_14.png' },
    { src: '/images/features/hair/ai_hair_15.png', feature: 'hair', isReal: false, feedback: 'AI generated - Check the overly uniform hair strands and unrealistic texture.', explanationImage: '/images/features/ex_hair/ai_hair_ex_15.png' },
    { src: '/images/features/hair/ai_hair_16.png', feature: 'hair', isReal: false, feedback: 'AI generated - Notice the artificial hair patterns and color bleeding from background.', explanationImage: '/images/features/ex_hair/ai_hair_ex_16.png' },
    { src: '/images/features/hair/ai_hair_17.png', feature: 'hair', isReal: false, feedback: 'AI generated - Look for the unnaturally smooth hair texture and artificial patterns.', explanationImage: '/images/features/ex_hair/ai_hair_ex_17.png' },
    { src: '/images/features/hair/ai_hair_18.png', feature: 'hair', isReal: false, feedback: 'AI generated - Check the unrealistic hair flow and texture uniformity issues.', explanationImage: '/images/features/ex_hair/ai_hair_ex_18.png' },
    { src: '/images/features/hair/ai_hair_19.png', feature: 'hair', isReal: false, feedback: 'AI generated - Notice the artificial hair texture and color blending problems.', explanationImage: '/images/features/ex_hair/ai_hair_ex_19.png' },
    { src: '/images/features/hair/ai_hair_20.png', feature: 'hair', isReal: false, feedback: 'AI generated - Look for the overly smooth hair edges and unrealistic texture patterns.', explanationImage: '/images/features/ex_hair/ai_hair_ex_20.png' }
];

// Pre-test 专用图片池
const PRE_TEST_IMAGES = [
    // Pre-test 真实图片
    { src: '/images/pre_test/pre_01.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/pre_test/pre_02.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/pre_test/pre_03.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/pre_test/pre_04.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/pre_test/pre_05.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/pre_test/pre_06.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/pre_test/pre_07.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/pre_test/pre_08.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/pre_test/pre_09.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/pre_test/pre_10.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    
    // Pre-test AI 图片
    { src: '/images/pre_ai/ai_01.png', isReal: false, feedback: 'AI generated - Notice the artificial features and unrealistic proportions.', explanationImage: null },
    { src: '/images/pre_ai/ai_02.png', isReal: false, feedback: 'AI generated - Look for the unnatural symmetry and artificial details.', explanationImage: null },
    { src: '/images/pre_ai/ai_03.png', isReal: false, feedback: 'AI generated - Check the unrealistic facial features and artificial patterns.', explanationImage: null },
    { src: '/images/pre_ai/ai_04.png', isReal: false, feedback: 'AI generated - Notice the artificial proportions and unnatural textures.', explanationImage: null },
    { src: '/images/pre_ai/ai_05.png', isReal: false, feedback: 'AI generated - Look for the unnaturally smooth elements and artificial blending.', explanationImage: null },
    { src: '/images/pre_ai/ai_06.png', isReal: false, feedback: 'AI generated - Check the unrealistic patterns and artificial details.', explanationImage: null },
    { src: '/images/pre_ai/ai_07.png', isReal: false, feedback: 'AI generated - Notice the artificial textures and color inconsistencies.', explanationImage: null },
    { src: '/images/pre_ai/ai_08.png', isReal: false, feedback: 'AI generated - Look for the unnaturally uniform features and artificial smoothness.', explanationImage: null },
    { src: '/images/pre_ai/ai_09.png', isReal: false, feedback: 'AI generated - Check the unrealistic proportions and artificial patterns.', explanationImage: null },
    { src: '/images/pre_ai/ai_10.png', isReal: false, feedback: 'AI generated - Notice the artificial details and unnatural blending.', explanationImage: null }
];

// Post-test 专用图片池
const POST_TEST_IMAGES = [
    // Post-test 真实图片
    { src: '/images/post_test/post_01.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/post_test/post_02.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/post_test/post_03.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/post_test/post_04.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/post_test/post_05.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/post_test/post_06.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/post_test/post_07.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/post_test/post_08.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/post_test/post_9.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/post_test/post_10.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    
    // Post-test AI 图片
    { src: '/images/post_ai/ai_01.png', isReal: false, feedback: 'AI generated - Notice the artificial features and unrealistic proportions.', explanationImage: null },
    { src: '/images/post_ai/ai_02.png', isReal: false, feedback: 'AI generated - Look for the unnatural symmetry and artificial details.', explanationImage: null },
    { src: '/images/post_ai/ai_03.png', isReal: false, feedback: 'AI generated - Check the unrealistic facial features and artificial patterns.', explanationImage: null },
    { src: '/images/post_ai/ai_04.png', isReal: false, feedback: 'AI generated - Notice the artificial proportions and unnatural textures.', explanationImage: null },
    { src: '/images/post_ai/ai_05.png', isReal: false, feedback: 'AI generated - Look for the unnaturally smooth elements and artificial blending.', explanationImage: null },
    { src: '/images/post_ai/ai_06.png', isReal: false, feedback: 'AI generated - Check the unrealistic patterns and artificial details.', explanationImage: null },
    { src: '/images/post_ai/ai_07.png', isReal: false, feedback: 'AI generated - Notice the artificial textures and color inconsistencies.', explanationImage: null },
    { src: '/images/post_ai/ai_08.png', isReal: false, feedback: 'AI generated - Look for the unnaturally uniform features and artificial smoothness.', explanationImage: null },
    { src: '/images/post_ai/ai_09.png', isReal: false, feedback: 'AI generated - Check the unrealistic proportions and artificial patterns.', explanationImage: null },
    { src: '/images/post_ai/ai_10.png', isReal: false, feedback: 'AI generated - Notice the artificial details and unnatural blending.', explanationImage: null }
];

// Fisher–Yates 随机打乱
function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Post-test 完成提示组件
const PostTestCompletion = ({ total, accuracy }) => {
    const navigate = useNavigate();
    
    const handleBackToWelcome = () => {
        navigate('/welcome');
    };
    
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20 text-center max-w-2xl mx-4">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Post-Test Completed!
                </h2>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Congratulations! You have successfully completed the post-training test. 
                    Your results have been saved and you can now view your detailed performance analysis 
                    and personalized training recommendations from the Welcome page.
                </p>
                
                <div className="space-y-4">
                    <button
                        onClick={handleBackToWelcome}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Back to Welcome Page
                    </button>
                </div>
                
                <div className="mt-8 p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-blue-700">
                        💡 <strong>Tip:</strong> You can access your results and analysis from the Welcome page by clicking "Show My Results".
                    </p>
                </div>
            </div>
        </div>
    );
};

const TestComponent = ({
                           totalQuestions,
                           isTraining,
                           attemptType,
                           featureFilter   // 新增：专项训练时传入 'asymmetries' | 'background' | 'hair'
                       }) => {
    const { user, updatePretestStatus, updateTrainingStatus, updatePosttestStatus, updateDelayedTestStatus } = useContext(UserContext);

    // 状态
    const [questions, setQuestions]       = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentPair, setCurrentPair]   = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [showFeedback, setShowFeedback]   = useState(false);
    const [feedbackText, setFeedbackText]   = useState('');
    const [explanationImage, setExplanationImage] = useState(null);
    const [stats, setStats] = useState({ total: 0, correct: 0 });

    // —— 生成题库 ——
    useEffect(() => {
        let realPool, aiPool;
        
        // 根据测试类型选择不同的图片池
        if (attemptType === 'pre_training') {
            // Pre-test 使用专门的图片池
            realPool = PRE_TEST_IMAGES.filter(img => img.isReal);
            aiPool = PRE_TEST_IMAGES.filter(img => !img.isReal);
        } else if (attemptType === 'post_training') {
            // Post-test 使用专门的图片池
            realPool = POST_TEST_IMAGES.filter(img => img.isReal);
            aiPool = POST_TEST_IMAGES.filter(img => !img.isReal);
        } else {
            // 其他测试（training, delayed_test, feature training）使用通用图片池
            realPool = IMAGES.filter(img => img.isReal);
            aiPool = IMAGES.filter(
                img => !img.isReal && (!featureFilter || img.feature === featureFilter)
            );
        }

        // 检查是否有足够的图片
        const maxPossibleQuestions = Math.min(realPool.length, aiPool.length);
        const actualQuestions = Math.min(totalQuestions, maxPossibleQuestions);
        
        if (actualQuestions < totalQuestions) {
            console.warn(`Not enough images available for ${attemptType}. Requested: ${totalQuestions}, Available: ${actualQuestions}`);
        }

        // 随机打乱图片池
        const shuffledReals = shuffle([...realPool]);
        const shuffledAis = shuffle([...aiPool]);

        const list = [];
        for (let i = 0; i < actualQuestions; i++) {
            const realImg = shuffledReals[i % shuffledReals.length];
            const aiImg = shuffledAis[i % shuffledAis.length];
            const isLeftReal = Math.random() < 0.5;
            
            list.push({
                left: isLeftReal ? realImg : aiImg,
                right: isLeftReal ? aiImg : realImg,
            });
        }
        
        setQuestions(list);
        setCurrentQuestion(0);
    }, [totalQuestions, featureFilter, attemptType]);

    useEffect(() => {
        if (currentQuestion === totalQuestions) {
            fetchStats();
            // 根据不同的测试类型更新用户状态
            if (attemptType === 'pre_training') {
                updatePretestStatus(true);
            } else if (attemptType === 'training') {
                updateTrainingStatus(true);
            } else if (attemptType === 'post_training') {
                updatePosttestStatus(true);
            } else if (attemptType === 'delayed_test') {
                updateDelayedTestStatus(true);
            }
        }
    }, [currentQuestion, totalQuestions, attemptType, updatePretestStatus, updateTrainingStatus, updatePosttestStatus, updateDelayedTestStatus]);

    // —— 同步当前题目对 ——
    useEffect(() => {
        if (questions[currentQuestion]) {
            setCurrentPair(questions[currentQuestion]);
        }
    }, [questions, currentQuestion]);

    const fetchStats = async () => {
        try {
            const url ='https://demo-production-b992.up.railway.app/api/submit-choice?userId='+encodeURIComponent(user.id);
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Status ${res.status}`);
            const data = await res.json();
            setStats({ total: data.total, correct: data.correct });
        } catch (err) {
            console.error('Stats fetch error:', err);
        }
    };

    const handleImageClick = async side => {
        if (currentQuestion >= totalQuestions) return;

        const chosen = side === 'left' ? currentPair.left : currentPair.right;
        const isCorrect =
            (side === 'left'  && currentPair.left.isReal) ||
            (side === 'right' && currentPair.right.isReal);

        setSelectedImage(side);
        setFeedbackText(chosen.feedback);
        setExplanationImage(chosen.explanationImage);
        setShowFeedback(isTraining);

        // 根据图片路径确定特征类型
        let selectedFeature = null;
        // 只有AI生成的图片才有特征，真实图片不需要特征
        if (!chosen.isReal) {
            if (chosen.src.includes('/asymmetries/') || chosen.src.includes('asymmetries')) {
                selectedFeature = 'asymmetries';
            } else if (chosen.src.includes('/background/') || chosen.src.includes('background')) {
                selectedFeature = 'background';
            } else if (chosen.src.includes('/hair/') || chosen.src.includes('hair')) {
                selectedFeature = 'hair';
            }
        }

        // 构造 snake_case payload
        const choiceData = {
            userId:         user.id || 'anonymous',
            choice:         side,
            isCorrect:      isCorrect,
            selectedFeature: selectedFeature,
            imagePath:      chosen.src,
            timestamp:      new Date().toISOString(),
            attemptType:    attemptType,
        };

        try {
            const res = await fetch('https://demo-production-b992.up.railway.app/api/submit-choice', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(choiceData),
            });
            if (!res.ok) throw new Error(`Status ${res.status}`);
            if (isTraining) await fetchStats();

            // 非训练模式直接推进；训练模式在关闭弹窗时推进
            if (!isTraining) {
                setCurrentQuestion(q => q + 1);
            }
        } catch (err) {
            console.error(err);
            alert('Data submission failed. Please check your network or backend.');
        }
    };

    const handleCloseFeedback = () => {
        setShowFeedback(false);
        setSelectedImage(null);
        setCurrentQuestion(q => q + 1);
    };

    // 进度 & 准确率
    const progress = (currentQuestion / totalQuestions) * 100;
    const accuracy = stats.total > 0
        ? ((stats.correct / stats.total) * 100).toFixed(2)
        : 0;

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />
                
                <div className="flex-1 p-6 max-w-6xl mx-auto w-full">
                    {/* Enhanced Progress Section */}
                    <div className="mb-8">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">
                                            {isTraining ? 'Training Progress' : 
                                             attemptType === 'pre_training' ? 'Pre-Test Progress' : 
                                             attemptType === 'post_training' ? 'Post-Test Progress' :
                                             attemptType === 'delayed_test' ? 'Delayed Test Progress' :
                                             'Test Progress'}
                                        </h2>
                                        <p className="text-sm text-gray-600">
                                            {featureFilter ? `${featureFilter.charAt(0).toUpperCase() + featureFilter.slice(1)} Feature Training` : 'General AI Detection'}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-gray-800">{currentQuestion}</div>
                                    <div className="text-sm text-gray-600">of {totalQuestions}</div>
                                </div>
                            </div>
                            
                            {/* Enhanced Progress Bar */}
                            <div className="relative">
                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs font-semibold text-gray-700 bg-white/80 px-2 py-1 rounded">
                                        {Math.round(progress)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Prompt Section */}
                    <div className="mb-8">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                Select the Real Image
                            </h3>
                            <p className="text-gray-600 max-w-md mx-auto">
                                Click on the image you believe is real, not AI-generated. Take your time to examine the details carefully.
                            </p>
                        </div>
                    </div>

                    {/* Enhanced Image Selection Area */}
                    <div className="flex justify-center items-center min-h-[400px]">
                        {currentQuestion < totalQuestions && currentPair.left && (
                            <div className="w-full max-w-4xl">
                                <ImageSelector
                                    leftImage={currentPair.left.src}
                                    rightImage={currentPair.right.src}
                                    onImageClick={handleImageClick}
                                    selected={selectedImage}
                                />
                            </div>
                        )}
                    </div>

                    {/* Enhanced Results Section */}
                    {currentQuestion >= totalQuestions && (
                        <div className="flex items-center justify-center min-h-[60vh]">
                            {attemptType === 'post_training' ? (
                                <PostTestCompletion total={totalQuestions} accuracy={accuracy} />
                            ) : (
                                <ResultSummary total={totalQuestions} accuracy={accuracy} />
                            )}
                        </div>
                    )}

                    {/* Enhanced Feedback Modal */}
                    {showFeedback && (
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                            <div className="animate-in slide-in-from-bottom-4 duration-300">
                                <StaticFeedback
                                    isVisible={showFeedback}
                                    isCorrect={
                                        (selectedImage === 'left'  && currentPair.left.isReal) ||
                                        (selectedImage === 'right' && currentPair.right.isReal)
                                    }
                                    feedbackText={feedbackText}
                                    explanationImage={explanationImage}
                                    onReset={handleCloseFeedback}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TestComponent;
