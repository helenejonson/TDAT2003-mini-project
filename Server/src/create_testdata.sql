insert into annonse (id, title, picturePath, pictureAlt, pictureCapt, text, date, author, category, importance) values
    (1,'tittel 1', 'https://images2.sw-cdn.net/product/picture/710x528_1129409_126266_1556338961.jpg',  'bildebeskrivese','bildetekst', new Date("2017-01-26"),
    'tekst til nr 1', 'Helene Jonson', 'D&D',1),
    (2,'tittel 2', 'https://i.pinimg.com/originals/a4/f2/a6/a4f2a6b43bf1fb4d1a8bfd9ce4eb446f.jpg',  'bildebeskrivese','bildetekst', new Date("2017-01-26"),
    'tekst til nr 2', 'Bunde', 'D&D',2),
    (3,'tittel 3', 'https://upload.wikimedia.org/wikipedia/en/a/af/Star_Wars_The_Rise_of_Skywalker_poster.jpg',  'bildebeskrivese','bildetekst', new Date("2017-01-26"),
    'tekst til nr 3', 'Helene Jonson', 'Movies',1),
    (4,'tittel 4', 'https://images-na.ssl-images-amazon.com/images/I/91UnxEI-Z5L.jpg',  'bildebeskrivese','bildetekst', new Date("2017-01-26"),
    'tekst til nr 4', 'Kari Normann', 'Books',1);

insert into comments (articleId, username, text) values
    (1,'CritRoleFan43', 'These are beautiful. I want some'),
    (1,'DiceGoblin', 'Just bought some. I cant wait'),
    (3,'Mike_Skywalker', 'Am I the only one afraid after the second one?'),
    (4,'DiceGoblin', 'I wonder what happened to Piper');


insert into category(name, description) values
    ('Movies', 'Blockbusters and staight to DVD. We cover all'),
    ('Books', 'Read your way to a new favourite'),
    ('MTG', 'All new card, lore and how-to'),
    ('D&D', 'We play Dungeons and Daragons!!!'),
    ('Anime', 'Kawaii');
