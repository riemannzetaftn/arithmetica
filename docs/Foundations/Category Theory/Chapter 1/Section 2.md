---
title: Section 2. Functors
---

A category is a structure where we relate objects by arrows between them. Why not we relate different categories?

!!! definition "Functor"

    A *functor* \(\caF\) from a category \(\sfC\) to a category \(\sfD\) consists of the following data: 

    - A function \(\Ob(\sfC)\to\Ob(\sfD)\), also denoted by \(\caF\).
    - For each pair of objects \((A,B)\) of \(\sfC\), a function \(\Hom_{\sfC}(A,B)\to\Hom_\sfD(\caF(A),\caF(B))\), also denoted by \(\caF\).

    These data are subject to the following conditions.

    - For any object \(A\) of \(\sfC\), \(\caF(\id_A) = \id_{\caF(A)}\). In words, the functor preserves identities.
    - For any composable pair of morphisms \((\phi:B\to C,\psi:A\to B)\) in \(\sfC\), \(\caF(\phi\circ\psi) = \caF(\phi)\circ\caF(\psi)\). In words, the functor preserves compositions.