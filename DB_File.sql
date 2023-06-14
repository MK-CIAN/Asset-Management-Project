DROP TABLE IF EXISTS Employee;

CREATE TABLE `Employee` (
  `EmployeeID` int NOT NULL,
  `FirstName` varchar(30) NOT NULL,
  `Surname` varchar(30) NOT NULL,
  `Email` varchar(60) NOT NULL,
  `MobileNumber` varchar(10) NOT NULL
);

INSERT INTO Employee (EmployeeID, FirstName, Surname, Email, MobileNumber) VALUES
(1, 'Oliver', 'King', 'OliverKing16@yahoo.com', '0834940268'),
(2, 'Noah', 'King', 'NoahKing21@yahoo.com', '0837721655'),
(3, 'William', 'Turner', 'WilliamTurner31@yahoo.com', '0839988638'),
(4, 'Mia', 'Nelson', 'MiaNelson81@yahoo.com', '0855118262');

SELECT * FROM Employee
