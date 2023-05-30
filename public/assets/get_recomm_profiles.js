export default function getRecommProfiles(profile, profiles, count) {
  const arrPunct = ['.', ',', '!', '?', ';', ':'];
  let arrHashTags = [];
  const result = [];
  let profilesSort = profiles;
  profile.posts.forEach((item) => {
    arrHashTags.push(...item.split(' ').filter((element) => element[0] === '#'));
  });
  arrHashTags = arrHashTags.map((item) => {
    if (arrPunct.includes(item[item.length - 1])) {
      return item.slice(0, item.length - 1);
    }
    return item;
  });
  arrHashTags = arrHashTags.filter((item, index) => arrHashTags.indexOf(item) === index);
  profiles.forEach((el, ind) => {
    profilesSort[ind].counter = 0;
    arrHashTags.forEach((hash) => {
      profilesSort[ind].posts.forEach((post, index) => {
        profilesSort[ind].counter += (profilesSort[ind].posts[index].includes(hash)) ? 1 : 0;
      });
    });
  });
  profilesSort = profilesSort.sort((a, b) => b.counter - a.counter);
  for (let i = 0; i < count; i += 1) {
    result.push(profilesSort[i].id);
  }
  return result;
}
