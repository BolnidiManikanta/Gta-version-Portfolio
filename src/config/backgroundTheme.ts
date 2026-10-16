/**
 * =========================================================================
 * BACKGROUND THEME CONFIGURATION
 * =========================================================================
 * 
 * You can update the intro background image directly here in code:
 * 
 * OPTION A (Local file upload):
 *   Upload or replace your file in: public/intro-bg.png (or public/image.png)
 * 
 * OPTION B (Web URL / Link):
 *   Change the value below to your image URL (e.g., 'https://your-site.com/image.png')
 * 
 * OPTION C (Base64 String):
 *   Change the value below to: 'data:image/png;base64,iVBORw0KGgo...'
 */

import defaultHomepageBg from '../assets/homepage-background.png';

export const INTRO_VIDEO_URL: string = '/Intro.mp4';
export const ABOUT_PAGE_IMAGE: string = '/about-page.png';
export const LEADER_PAGE_IMAGE: string = '/leader-page.png';
export const EXPERIENCE_PAGE_IMAGE: string = '/leader-page.png';
export const INTRO_BACKGROUND_IMAGE: string = '';
export const HOMEPAGE_BACKGROUND_IMAGE: string = defaultHomepageBg || '/homepage-background.png';
export const PROJECT_VAULT_PAGE_IMAGE: string = '/project-vault-page.png';

