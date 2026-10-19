---
title: Section 1. Categories
---

In this section we define categories.

!!! definition "Category"

    A *category* $\sfC$ consists of the following data.

    - A class of its *objects*, denoted by \(\Ob(\sfC)\), and
    - For each pair \((A,B)\) of its objects, a set of the *morphisms* from $A$ to $B$, denoted by \(\Hom_{\sfC}(A,B)\). We denote \(f\in\Hom_\sfC(A,B)\) by \(\phi:A\to B\).
    - For each triple \((A,B,C)\) of its objects, a *composition function* \(\circ=\circ_{A,B,C}:\Hom_{\sfC}(B,C)\times\Hom_{\sfC}(A,B)\to\Hom_{\sfC}(A,C)\), \((\phi,\psi)\mapsto \phi\circ\psi\).

    These data are subject to the following conditions.

    - The classes \(\Hom_\sfC(A,B)\) are disjoint for distinct pairs \((A,B)\).
    - For each object \(A\), there exist a morphism \(\id_A:A\to A\), called the *identity* of \(A\), such that for every \(B\in\Ob(\sfC)\), \(\phi:A\to B\) and \(\psi:B\to A\), \(\phi = \phi\circ\id_A\) and \(\psi = \id_A\circ\psi\).
    - For each quadruple \((A,B,C,D)\) of objects, and each triple \((\phi:C\to D,\psi:B\to C,\varphi:A\to B)\) of morphisms, we have *associativity* \(\phi\circ(\psi\circ\varphi) = (\phi\circ\psi)\circ\varphi\).

    Given a category \(\sfC\), we define the followings.

    - Given a morphism \(\phi:A\to B\) in \(\sfC\), \(A\) is called a *domain* of \(\phi\) and \(B\) is called a *codomain* of \(\phi\).
    - A morphism \(\phi:A\to B\) in \(\sfC\) is called an *isomorphism* if there exist an *inverse* \(\psi:B\to A\), which satisfies \(\psi\circ\phi = \id_A\) and \(\phi\circ\psi = \id_B\).
    - Two objects \(A\) and \(B\) of \(\sfC\) are said to be *isomorphic* if there is an isomorphism \(\phi:A\to B\), and this is denoted by \(A\cong B\).
    - Given an object \(A\) of \(\sfC\), any morphism \(\phi:A\to A\) is called an *endomorphism* of \(A\), and an endomorphism which is an isomorphism is called an *automorphism* of \(A\). The set of endomorphisms and automorphisms of \(A\) are denoted by \(\End_\sfC(A)\) and \(\Aut_\sfC(A)\).
    { #def-category }

We observe the followings.

- From the first assumption, the domain and codomain of any morphism is uniquely determined, and there's no ambiguity in omitting subscript \(A,B,C\) from the composition symbol \(\circ\). Therefore, we speak of 'the' domain and 'the' codomain from now on. The pair \((\phi,\psi)\) of morphisms is said to be *composable* if the domain of \(\phi\) equals the codomain of \(\psi\), so that the composition \(\phi\circ\psi\) is defined.
- If a morphism \(\phi:A\to B\) in \(\sfC\) has inverses \(\psi,\varphi\), then we have
    
    \[\psi = \psi\circ\id_B = \psi\circ(\phi\circ\varphi) = (\psi\circ\phi)\circ\varphi = \id_A\circ\varphi = \varphi.\]
    
    That is, inverse of a morphism is unique provided that it exists, and we shall speak of 'the' inverse. The inverse of \(\phi\), if exists, is also denoted by \(\phi^{-1}\).
- The relation of being isomorphic is

    - Reflexive, since for any object \(A\), \(\id_A:A\to A\) satisfies \(\id_A\circ\id_A = \id_A\), so that it is the inverse of itself, and is an isomorphism.
    - Symmetric, since for an isomorphism \(\phi:A\to B\), its inverse \(\psi:B\to A\) is also an isomorphism as \(\phi\) is its inverse by definition.
    - Transitive, since for isomorphisms \(\phi:A\to B\) and \(\psi:B\to C\), \(\psi\circ\phi:A\to C\) is an isomorphism with the inverse \(\phi^{-1}\circ\psi^{-1}\):
        
        \begin{align*}
            (\phi^{-1}\circ\psi^{-1})\circ(\psi\circ\phi) &= \phi^{-1}\circ(\psi^{-1}\circ(\psi\circ\phi))\\
            &= \phi^{-1}\circ((\psi^{-1}\circ\psi)\circ\phi)\\
            &= \phi^{-1}\circ(\id_B\circ\phi)\\
            &= \phi^{-1}\circ\phi\\
            &= \id_A
        \end{align*}
        
        and similarly \((\psi\circ\phi)\circ(\phi^{-1}\circ\psi^{-1}) = \id_C\).
    
    Therefore, the relation of being isomorphic is an equivalence relation, and we sometimes identify those objects.

When the category \(\sfC\) is obvious from context, we may omit this in the notations. For instance, we may denote the set of morphisms, isomorphisms, endomorphisms and automorphisms by \(\Hom(A,B), \End(A)\) and \(\Aut(A)\).

We now introduce the most typical examples of categories, from various fields of mathematics.

!!! example "Category"

    1. The category \(\Set\) has sets as its objects, and functions between those sets as morphisms between the objects. The conditions are verified in set theory. A function is an isomorphism if and only if it is a bijection, and two sets are isomorphic if and only if they have the same cardinality. The automorphisms of a set \(A\) are also called the 'permutations' of \(A\), and \(\Aut_\Set(A)\) is often denoted by \(\Sym(A)\).
    2. In algebra, we have bunch of algebraic structures, and each with structure-preserving functions form categories. In the below examples, isomorphisms are exactly the bijective morphisms (since inverse function is also a morphism).

    - \(\Mnd\): monoids and monoid homomorphisms.
    - \(\Grp\): groups and group homomorphisms.
    - \(\Ab\): abelian groups and group homomorphisms between them.
    - \(\Ring\): (unital) rings and (unital) ring homomorphisms between them. (Throughout this blog, 'ring' and 'ring homomorphism' will always denote unital ones.)
    - \(\CRing\): commutative rings and ring homomorphisms between them.
    - \(\Dom\): integral domains and injective ring homomorphisms between them. (The choice of morphisms is on purpose: we shall shortly see its convenience while dealing with universal property of field of fractions.)
    - \(\Field\): fields and ring homomorphisms between them.
    - For each field \(k\), the category \(\Vec_k\) consists of \(k\)-vector spaces and \(k\)-linear maps between them. More generally, for each ring \(R\), the category \(R-\Mod\) (resp. \(\Mod-R\)) consists of left (resp. right) \(R\)-modules and \(R\)-linear maps between them. For these categories, we have another abbreviation for sets of morphisms: we denote them by \(\Hom_R(M,N)\), \(\End_R(M)\), and \(\Aut_R(M)\). If \(R\) is commutative, we simply denote the category by \(\Mod_R\).
    - For each commutative ring \(R\) (including the case of \(R = k\) being a field), the category \(\Alg_R\) consists of \(R\)-algebras (i.e. a ring \(S\) with a ring homomorphism \(\varphi:R\to S\) (or the homomorphism \(\varphi\) itself) whose image lie inside the center of \(S\)) and \(R\)-algebra homomorphisms (if \(\varphi:R\to S\) and \(\psi:R\to T\) represents two \(R\)-algebras, an \(R\)-algebra homomorphism from former to latter is a ring homomorphism \(\phi:S\to T\) with \(\phi\circ\varphi = \psi\)).
    - For each commutative ring \(R\), the category \(\CAlg_R\) consists of commutative \(R\)-algebras (i.e. an \(R\)-algebra \(\varphi:R\to S\) with \(S\) being commutative) and \(R\)-algebra homomorphisms between them.
    - For each field \(k\), the category \(\LieAlg_k\) consists of Lie algebras over \(k\) with Lie algebra homomorphisms between them.