let profile_imgs_name_list = [
  "Garfield",
  "Tinkerbell",
  "Annie",
  "Loki",
  "Cleo",
  "Angel",
  "Bob",
  "Mia",
  "Coco",
  "Gracie",
  "Bear",
  "Bella",
  "Abby",
  "Harley",
  "Cali",
  "Leo",
  "Luna",
  "Jack",
  "Felix",
  "Kiki",
];
let profile_imgs_collections_list = [
  "notionists-neutral",
  "adventurer-neutral",
];

const generateImage = () => {
  return `https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${
    profile_imgs_name_list[
      Math.floor(Math.random() * profile_imgs_name_list.length)
    ]
  }`;
};

export default generateImage