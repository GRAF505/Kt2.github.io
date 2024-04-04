abstract class Publisher {
    title: string;
    author: string;
    pubyear: number;
    copies: number;

    constructor(title: string, author: string, pubyear: number, copies: number) {
        this.title = title;
        this.author = author;
        this.pubyear = pubyear;
        this.copies = copies;
    }

    // Методы для получения и изменения каждого поля
    getTitle(): string {
        return this.title;
    }

    setTitle(title: string): void {
        this.title = title;
    }

    getAuthor(): string {
        return this.author;
    }

    setAuthor(author: string): void {
        this.author = author;
    }

    getPubyear(): number {
        return this.pubyear;
    }

    setPubyear(pubyear: number): void {
        this.pubyear = pubyear;
    }

    getCopies(): number {
        return this.copies;
    }

    setCopies(copies: number): void {
        this.copies = copies;
    }

}

// Создаем подкласс Book
class Book extends Publisher {
    pages: number;

    constructor(title: string, author: string, pubyear: number, copies: number, pages: number) {
        super(title, author, pubyear, copies);
        this.pages = pages;
    }
}

// Создаем подкласс Magazine
class Magazine extends Publisher {
    issue: number;

    constructor(title: string, author: string, pubyear: number, copies: number, issue: number) {
        super(title, author, pubyear, copies);
        this.issue = issue;
    }
}

// Создаем интерфейс Reception
interface Reception {
    delivery(): void;
    receive(): void;
}

// Реализуем интерфейс в классах Book и Magazine
class Reader {
    firstname: string;
    lastname: string;
    items: Publisher[];

    constructor(firstname: string, lastname: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.items = [];
    }

    // Методы для получения и изменения каждого поля
    getFirstname(): string {
        return this.firstname;
    }

    setFirstname(firstname: string): void {
        this.firstname = firstname;
    }

    getLastname(): string {
        return this.lastname;
    }

    setLastname(lastname: string): void {
        this.lastname = lastname;
    }

    // Методы выдачи и принятия издания у читателя
    checkOut(item: Publisher): void {
        if (item.getCopies() > 0 && this.items.length < 3) {
            item.setCopies(item.getCopies() - 1);
            this.items.push(item);
            console.log(`${this.firstname} ${this.lastname} взял ${item.getTitle()}`);
        } else {
            console.log(`Невозможно выдать ${item.getTitle()} ${this.firstname}у ${this.lastname}`);
        }
    }

    return(item: Publisher): void {
        const index = this.items.indexOf(item);
        if (index > -1) {
            item.setCopies(item.getCopies() + 1);
            this.items.splice(index, 1);
            console.log(`${this.firstname} ${this.lastname} вернул ${item.getTitle()}`);
        } else {
            console.log(`${this.firstname} ${this.lastname} не имеет ${item.getTitle()}`);
        }
    }
}

// Создаем класс Library
class Library {
    publications: Publisher[];

    constructor() {
        this.publications = [];
    }

    // Методы для добавления и удаления издания из библиотеки
    addPublication(publication: Publisher): void {
        this.publications.push(publication);
        console.log(`Добавлена ${publication.getTitle()} в библиотеку`);
    }

    removePublication(title: string): void {
        const index = this.publications.findIndex(publication => publication.getTitle() === title);
        if (index !== -1) {
            this.publications.splice(index, 1);
            console.log(`Удалена ${title} из библиотеки`);
        } else {
            console.log(`${title} не найдена в библиотеке`);
        }
    }
}

// Создаем объекты всех классов
const book1 = new Book('Book 1', 'Author 1', 2020, 5, 200);
const magazine1 = new Magazine('Magazine 1', 'Author 2', 2021, 3, 10);
const reader1 = new Reader('jonny', 'SilverHAnd');
const library = new Library();

// Тестируем методы
library.addPublication(book1);
library.addPublication(magazine1);
reader1.checkOut(book1);
reader1.checkOut(magazine1);
reader1.checkOut(magazine1);
reader1.checkOut(book1);
reader1.return(book1);
library.removePublication('Book 1');