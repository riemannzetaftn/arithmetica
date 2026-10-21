---
title: Section 2. Functors
---

A category is a structure where we relate objects by arrows between them. Why not we relate different categories?

!!! definition "Functor"

    1. A *(covariant) functor* \(\caF\) from a category \(\sfC\) to a category \(\sfD\), denoted by \(\caF:\sfC\to\sfD\), consists of the following data: 

        - A function \(\Ob(\sfC)\to\Ob(\sfD)\) of objects, also denoted by \(\caF\).
        - For each pair of objects \((A,B)\) of \(\sfC\), a function \(\Hom_{\sfC}(A,B)\to\Hom_\sfD(\caF(A),\caF(B))\) of morphisms, also denoted by \(\caF\).

        These data are subject to the following conditions.

        - For any object \(A\) of \(\sfC\), \(\caF(\id_A) = \id_{\caF(A)}\). In words, the functor preserves identities.
        - For any composable pair of morphisms \((\phi:B\to C,\psi:A\to B)\) in \(\sfC\), \(\caF(\phi\circ\psi) = \caF(\phi)\circ\caF(\psi)\). In words, the functor preserves compositions.

    2. A *contravariant functor* \(\caF:\sfC\to\sfD\) is a covariant functor \(\caF:\sfC^\op\to\sfD\). Equivalently, it consists of the following data: 

        - A function \(\caF:\Ob(\sfC)\to\Ob(\sfD)\).
        - For each pair of objects \((A,B)\) of \(\sfC\), a function \(\caF:\Hom_{\sfC}(A,B)\to\Hom_\sfD(\caF(B),\caF(A))\).

        These data are subject to the following conditions.

        - For any object \(A\) of \(\sfC\), \(\caF(\id_A) = \id_{\caF(A)}\). In words, the functor preserves identities.
        - For any composable pair of morphisms \((\phi:B\to C,\psi:A\to B)\) in \(\sfC\), \(\caF(\phi\circ\psi) = \caF(\psi)\circ\caF(\phi)\). In words, the functor preserves compositions, but reverses the order.

    For any category \(\sfC\), there is a covariant functor \(\id_\sfC\), called the *identity functor* of \(\sfC\), which consists of identity functions on the sets \(\Ob(\sfC)\), \(\Hom_\sfC(A,B)\).

    Given a pair of covariant functors \(\caG:\sfD\to\sfE\) and \(\caF:\sfC\to\sfD\), we define their *composition* by the covariant functor \(\caG\circ\caF:\sfC\to\sfE\), which consists of compositions 

    ```tikzcd
        \begin{tikzcd}
            \Ob(\sfC) \arrow[rr,"\caF"{description}] & &\Ob(\sfD) \arrow[rr,"\caG"{description}] & &\Ob(\sfE)\\
            \Hom_{\sfC}(A,B) \arrow[rr,"\caF"{description}] & &\Hom_\sfD(\caF(A),\caF(B)) \arrow[rr,"\caG"{description}] & &\Hom_\sfE(\caG(\caF(A)),\caG(\caF(B))).
        \end{tikzcd}
    ```
    
    A (covariant or contravariant) functor \(\caF:\sfC\to\sfD\) is said to be 

    - *faithful*, if it is injective on morphisms.
    - *full*, if it is surjective on morphisms.
    - *fully faithful*, if it is bijective on morphisms; i.e. it is both full and faithful.
    - *essentially surjective*, if any object \(B\) of \(\sfD\) is isomorphic to \(\caF(A)\) for some object \(A\) of \(\sfC\).

As you can see, a functor is an arrow between categories: it consists of functions which preserve the structure of categories. Throughout this blog, unless otherwise specified, a functor will denote a covariant one.

!!! example "Functor"

    1. If \(\sfD\) is a subcategory of \(\sfC\), then the inclusions \(\Ob(\sfD)\to\Ob(\sfC)\) and \(\Hom_\sfD(A,B)\subset\Hom_\sfC(A,B)\) form a functor since the identities and compositions were inherited, called an *inclusion functor*, which is always faithful. \(\sfD\) is a full subcategory of \(\sfC\) if and only if the inclusion functor is fully faithful.
    2. TBU