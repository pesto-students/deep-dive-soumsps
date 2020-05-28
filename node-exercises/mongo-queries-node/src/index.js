/* Q1 (*)
  Return the number of movies in the "movies" collection without using array.length
*/
const getMoviesCount = async (db) => {
  return await db.collection('movies').count();
};

/* Q2 (*)
  Return the first movie with imdb rating = 9.2 and year = 1974.
  Also, use mongodb projections to only get title from mongodb as opposed
  to accessing title property from the object
*/
const movieRating = async (db) => {
  return await db
    .collection('movieDetails')
    .findOne(
      { $and: [{ year: 1974 }, { 'imdb.rating': 9 }] },
      { projection: { title: 1, _id: 0 } }
    );
};

/* Q3 (*)
  Return the number of movies written by all these people (exactly these people in this order):
  Roberto Orci
  Alex Kurtzman
  Damon Lindelof
  Gene Roddenberry
*/
const writersIntersection = async (db) => {
  return await db
    .collection('movieDetails')
    .find({
      $and: [
        { writers: 'Roberto Orci' },
        { writers: 'Alex Kurtzman' },
        { writers: 'Damon Lindelof' },
        { writers: 'Gene Roddenberry' },
      ],
    })
    .count();
};

/* Q4 (*)
  Return the number of movies written by any of the writers in Q3
*/
const writersUnion = async (db) => {
  return await db
    .collection('movieDetails')
    .find({
      $or: [
        { writers: 'Roberto Orci' },
        { writers: 'Alex Kurtzman' },
        { writers: 'Damon Lindelof' },
        { writers: 'Gene Roddenberry' },
      ],
    })
    .count();
};

/* Q5 (*)
  Return the number of movies in which actor is "Jackie Chan"
*/
const actor = async (db) => {
  return await db.collection('movieDetails').find({ actors: 'Jackie Chan' }).count();
};

/* Q6 (*)
  Return the number of movies in which actor "Jackie Chan" is second
  in the array "actors"
*/
const positionalActor = async (db) => {
  return await db.collection('movieDetails').find({ 'actors.1': 'Jackie Chan' }).count();
};

/* Q7 (*)
  Return the first movie with imdb rating greater than or equal to 9.0
  and less than or equal to 9.2
*/
const comparisonOperator = async (db) => {
  return await db
    .collection('movieDetails')
    .find({ $and: [{ 'imdb.rating': { $gte: 9.0 } }, { 'imdb.rating': { $lte: 9.2 } }] })
    .count();
};

/* Q8 (*)
  Return the number of movies which have an actual rating opposed to
  being "UNRATED" or having no "rated" field at all
*/
const trimUnrated = async (db) => {
  return await db
    .collection('movieDetails')
    .find({
      $and: [{ rated: { $ne: 'UNRATED' } }, { rated: { $exists: true } }],
    })
    .count();
};

/* Q9 (*)
  Return number of movies in which "tomato" field exists but "tomato.rating" does not
*/
const unratedByTomato = async (db) => {
  return await db
    .collection('movieDetails')
    .find({
      $and: [{ tomato: { $exists: true } }, { 'tomato.rating': { $exists: false } }],
    })
    .count();
};

/* Q10 (*)
  Return number of movies with higher imdb rating >= 9.0 OR
  metacritic >= 90
*/
const goodMovies = async (db) => {
  return await db
    .collection('movieDetails')
    .find({ $or: [{ 'imdb.rating': { $gte: 9.0 } }, { metacritic: { $gte: 90 } }] })
    .count();
};

/* Q11 (*)
  Return number of movies where tomato field exists AND
  is equal to null
*/
const regexSearch = async (db) => {
  await db.collection('movieDetails').createIndex({ plot: 'text' });
  const temp = await db
    .collection('movieDetails')
    .find({ $text: { $search: '"Master Yoda"' } })
    .project({ title: 1, _id: 0 })
    .toArray();
  return temp[0];
};

/* Q12 (*)
  Return number of movies where 'Adventure' and 'Action'
  as genres in any order
*/
const arrayAll = async (db) => {
  return await db
    .collection('movieDetails')
    .find({ $and: [{ genres: 'Adventure' }, { genres: 'Action' }] })
    .count();
};

/* Q13 (*)
  Return number of movies that were filmed in exactly 4 countries
*/
const fieldArraySize = async (db) => {
  return await db
    .collection('movieDetails')
    .find({ countries: { $size: 4 } })
    .count();
  // return await db
  //   .collection('movieDetails')
  //   .find({
  //     $and: [{ 'countries.3': { $exists: true } }, { 'countries.4': { $exists: false } }],
  //   })
  //   .count();
};

/* Q14 (*)
  Add a field called "myRating" = 90 to the movie "Iron Man 3" in movieDetails collection
*/
const addField = async (db) => {
  db.collection('movieDetails').update(
    { title: 'Iron Man 3' },
    {
      $set: { myRating: 90 },
    }
  );
};

/* Q15 (*)
  Increment the metacritic rating by 5 for the movie "Gone Girl" with a single query.
  Note: Do not use find() or findOne() to look for the current metacritic rating for "Gone Girl"
*/
const incrementalUpdate = async (db) => {
  db.collection('movieDetails').updateOne(
    { title: 'Gone Girl' },
    {
      $inc: { metacritic: 5 },
    }
  );
};

module.exports = {
  getMoviesCount,
  movieRating,
  writersIntersection,
  writersUnion,
  actor,
  positionalActor,
  comparisonOperator,
  trimUnrated,
  unratedByTomato,
  goodMovies,
  regexSearch,
  arrayAll,
  fieldArraySize,
  addField,
  incrementalUpdate,
};
