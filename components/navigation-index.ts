/* eslint-disable @typescript-eslint/no-unused-vars */
export type MainTabChildSiblingName =
  | 'Anna'
  | 'Kristoff'
  | 'Sven'
  | 'Olaf'
  | 'Elsa';
export type MainTabNavigateToSiblingFunc = (
  name: MainTabChildSiblingName,
) => void;
