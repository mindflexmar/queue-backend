CREATE TABLE Citizen (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50)
);

CREATE TABLE Specialization (
    code INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE Specialist (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    position VARCHAR(100)
);

CREATE TABLE SpecialistSpecialization (
    specialist_id INT NOT NULL REFERENCES Specialist(id),
    specialization_code INT NOT NULL REFERENCES Specialization(code),
    PRIMARY KEY (specialist_id, specialization_code)
);

CREATE TABLE Request (
    id SERIAL PRIMARY KEY,
    creation_date TIMESTAMP,
    daily_number INTEGER NOT NULL,
    description TEXT NOT NULL,
    citizen_id INTEGER REFERENCES Citizen(id),
    specialist_id INTEGER REFERENCES Specialist(id),
    specialization_code INTEGER REFERENCES Specialization(code),
    status VARCHAR(20) DEFAULT 'очікує'
);

INSERT INTO Citizen (firstname, lastname) VALUES
('Олена', 'Іваненко'),
('Микола', 'Петренко'),
('Світлана', 'Ковальчук'),
('Костя', 'Ткачов'),
('Наталія', 'Литвин'),
('Василь', 'Данилюк'),
('Ірина', 'Кравець'),
('Андрій', 'Захаренко'),
('Тетяна', 'Мельник'),
('Юрій', 'Гончар');

INSERT INTO Specialization (code, name) VALUES
(101, 'Соціальний працівник'),
(102, 'Пенсійний консультант'),
(103, 'Спеціаліст з комунальних послуг'),
(104, 'Консультант з субсидій'),
(105, 'Інспектор реєстрації місця проживання'),
(106, 'Фахівець зі страхування'),
(107, 'Консультант із земельних питань'),
(108, 'Юридичний консультант'),
(109, 'Медичний представник'),
(110, 'Експерт з е-услуг');

INSERT INTO Specialist (name, position) VALUES
('Ганна Бондаренко', 'Фахівець відділу субсидій'),
('Олексій Романюк', 'Консультант ПФУ'),
('Людмила Сорока', 'Фахівець ЦКС'),
('Володимир Черненко', 'Соціальний інспектор'),
('Катерина Литвиненко', 'Інспектор з реєстрації'),
('Петро Сидоренко', 'Консультант страхування'),
('Марія Лещенко', 'Фахівець земельних питань'),
('Тимофій Кушнір', 'Юрист установи'),
('Ольга Савчук', 'Медичний координатор'),
('Аліна Бережна', 'Спеціаліст з електронних сервісів');

INSERT INTO Request (creation_date, daily_number, description, citizen_id, specialist_id, specialization_code, status) VALUES
(NOW(), 1, 'Питання субсидії на житло', 1, 1, 104, 'очікує'),
(NOW(), 2, 'Оформлення пенсії', 2, 2, 102, 'в обробці'),
(NOW(), 3, 'Перерахунок оплати за воду', 3, 3, 103, 'завершено'),
(NOW(), 4, 'Компенсація опалення', 4, 4, 101, 'очікує'),
(NOW(), 5, 'Реєстрація місця проживання', 5, 5, 105, 'відхилено'),
(NOW(), 6, 'Страховий випадок з лікарняним', 6, 6, 106, 'завершено'),
(NOW(), 7, 'Оренда землі', 7, 7, 107, 'в обробці'),
(NOW(), 8, 'Юридична консультація щодо спадщини', 8, 8, 108, 'очікує'),
(NOW(), 9, 'Медична довідка', 9, 9, 109, 'завершено'),
(NOW(), 10, 'Реєстрація на е-сервіс "Дія"', 10, 10, 110, 'очікує');

INSERT INTO SpecialistSpecialization (specialist_id, specialization_code) VALUES
(1, 104),
(2, 102),
(3, 103),
(4, 101),
(5, 105),
(6, 106),
(7, 107),
(8, 108),
(9, 109),
(10, 110);
