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
    - Two objects \(A\) and \(B\) of \(\sfC\) are said to be *isomorphic* if there is an isomorphism \(\phi:A\to B\), and this is denoted by \(A\cong B\).
    - Given an object \(A\) of \(\sfC\), any morphism \(\phi:A\to A\) is called an *endomorphism* of \(A\), and an endomorphism which is an isomorphism is called an *automorphism* of \(A\). The set of endomorphisms and automorphisms of \(A\) are denoted by \(\End_\sfC(A)\) and \(\Aut_\sfC(A)\).
    { #def-category }

We observe the followings.

- From the first assumption, the domain and codomain of any morphism is uniquely determined. Therefore, we speak of 'the' domain and 'the' codomain from now on. Two morphisms \(\phi,\psi\) are said to be *composable* if the domain of \(\phi\) equals the codomain of \(\psi\), so that \(\phi\circ\psi\) is defined.
- If a morphism \(\phi:A\to B\) in \(\sfC\) has inverses \(\psi,\varphi\), then we have \[\psi = \psi\circ\id_B = \psi\circ(\phi\circ\varphi) = (\psi\circ\phi)\circ\varphi = \id_A\circ\varphi = \varphi.\] That is, inverse of a morphism is unique provided that it exists, and we shall speak of 'the' inverse. The inverse of \(\phi\), if exists, is also denoted by \(\phi^{-1}\).
- The relation of being isomorphic is

    - Reflexive, since for any object \(A\), \(\id_A:A\to A\) satisfies \(\id_A\circ\id_A = \id_A\), so that it is the inverse of itself, and is an isomorphism.
    - Symmetric, since for an isomorphism \(\phi:A\to B\), its inverse \(\psi:B\to A\) is also an isomorphism as \(\phi\) is its inverse by definition.
    - Transitive, since for isomorphisms \(\phi:A\to B\) and \(\psi:B\to C\), \(\psi\circ\phi:A\to C\) is an isomorphism with the inverse \(\phi^{-1}\circ\psi^{-1}\): \begin{align}
        (\phi^{-1}\circ\psi^{-1})\circ(\psi\circ\phi) &= \phi^{-1}\circ(\psi^{-1}\circ(\psi\circ\phi))\\
        &= \phi^{-1}\circ((\psi^{-1}\circ\psi)\circ\phi)\\
        &= \phi^{-1}\circ(\id_B\circ\phi)\\
        &= \phi^{-1}\circ\phi\\
        &= \id_A
    \end{align} and similarly \((\psi\circ\phi)\circ(\phi^{-1}\circ\psi^{-1}) = \id_C\).