import Service from "../Services";

describe('Services', () => {
    test('should be detected for assigned fields', () => {
        let expectedFields = ['id', 'example', 'example2'];
        let service = new Service('test', expectedFields);
        expect(service.canProcessCsv(expectedFields)).toBeTruthy();
    });

    test('should not be detected when fields differ',  () => {
        let expectedFields = ['id', 'example', 'example2'];
        let csvFields = expectedFields.slice(0, -1);
        let service = new Service('test', expectedFields);
        expect(service.canProcessCsv(csvFields)).toBeFalsy();

    });

    test('should not be detected if no fields assigned', () => {
        let expectedFields = [];
        let service = new Service('test', expectedFields);
        expect(service.canProcessCsv([])).toBeFalsy();
    });
});
