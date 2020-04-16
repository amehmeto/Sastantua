import {Sastantua} from './Sastantua'

describe('Sastantua Suite Test', () => {
    describe('Sastantua size 1', () => {
        it('should draw the first flour no door', () => {
            const pyramid =
                '  /*\\\n' +
                ' /***\\\n' +
                '/*****\\\n'
            expect(new Sastantua().draw(1)).toStrictEqual(pyramid)
        })
    })

    describe('Sastantua size 2 temporary', () => {
        it('should draw 2 flours', () => {
            const pyramid =
                '        /*\\\n' +
                '       /***\\\n' +
                '      /*****\\\n'
            expect(new Sastantua().draw(2)).toStrictEqual(pyramid)
        })
    })


    /*
    describe('Sastantua size 2', () => {
        it.skip.each([
            [
                '  /*\\\n' +
                ' /***\\\n' +
                '/*****\\\n' +
                '   /***********\\\n' +
                '  /*************\\\n' +
                ' /***************\\\n' +
                '/**|**\\\n'
            ],
            [
                '  /*\\\n' +
                ' /***\\\n' +
                '/*****\\\n' +
                '   /***********\\\n' +
                '  /*************\\\n' +
                ' /***************\\\n' +
                '/********|********\\\n'
            ],
            [
                '        /*\\\n' +
                '       /***\\\n' +
                '      /*****\\\n' +
                '   /***********\\\n' +
                '  /*************\\\n' +
                ' /***************\\\n' +
                '/**|**\\\n'
            ],
        ])('shoud draw temporary goal', (pyramid) => {
            expect(new Sastantua().draw(2))
                .toStrictEqual(pyramid)
        })

        it.skip('shoud draw the first two stages', () => {
            const pyramid =
                '        /*\\\n' +
                '       /***\\\n' +
                '      /*****\\\n' +
                '   /***********\\\n' +
                '  /*************\\\n' +
                ' /***************\\\n' +
                '/********|********\\\n'
            expect(new Sastantua().draw(2)).toStrictEqual(pyramid)
        })
    })

     */
})