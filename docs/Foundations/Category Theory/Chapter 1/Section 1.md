---
title: Section 1. Categories
---

In this section we define categories.

!!! definition "Category"

    A *category* $\sfC$ consists of the following data.

    - A set of its *objects*, denoted by \(\Ob(\sfC)\), and
    - For each pair \((A,B)\) of its objects, a set of the *morphisms* from $A$ to $B$, denoted by \(\Hom_{\sfC}(A,B)\). We denote \(f\in\Hom_\sfC(A,B)\) by \(\phi:A\to B\).
    - For each triple \((A,B,C)\) of its objects, a *composition function* \(\circ=\circ_{A,B,C}:\Hom_{\sfC}(B,C)\times\Hom_{\sfC}(A,B)\to\Hom_{\sfC}(A,C)\), \((\phi,\psi)\mapsto \phi\circ\psi\).

    These data are subject to the following conditions.

    - The sets \(\Hom_\sfC(A,B)\) are disjoint for distinct pairs \((A,B)\).
    - For each object \(A\), there exist a morphism \(\id_A:A\to A\), called the *identity* of \(A\), such that for every \(B\in\Ob(\sfC)\), \(\phi:A\to B\) and \(\psi:B\to A\), \(\phi = \phi\circ\id_A\) and \(\psi = \id_A\circ\psi\).
    - For each quadruple \((A,B,C,D)\) of objects, and each triple \((\phi:C\to D,\psi:B\to C,\varphi:A\to B)\) of morphisms, we have *associativity* \(\phi\circ(\psi\circ\varphi) = (\phi\circ\psi)\circ\varphi\).

    Given a category \(\sfC\), we define the followings.

    - Given a morphism \(\phi:A\to B\) in \(\sfC\), \(A\) is called a *domain* of \(\phi\) and \(B\) is called a *codomain* of \(\phi\).
    - A morphism \(\phi:A\to B\) in \(\sfC\) is called an *isomorphism* if there exist an *inverse* \(\psi:B\to A\), which satisfies \(\psi\circ\phi = \id_A\) and \(\phi\circ\psi = \id_B\). The set of isomorphisms from \(A\) to \(B\) is denoted by \(\Iso(A,B)\).
    - Two objects \(A, B\) of \(\sfC\) are said to be *isomorphic* if there is an isomorphism \(\phi:A\to B\), and this is denoted by \(A\cong B\).
    - Given an object \(A\) of \(\sfC\), any morphism \(\phi:A\to A\) is called an *endomorphism* of \(A\), and an endomorphism which is an isomorphism is called an *automorphism* of \(A\). The set of endomorphisms and automorphisms of \(A\) are denoted by \(\End_\sfC(A)\) and \(\Aut_\sfC(A)\).
    { #def-category }