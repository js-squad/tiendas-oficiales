import fs from 'fs';
import * as acorn from 'acorn';
import estraverse from 'estraverse';
import dir from 'node-dir';
import tap, { test } from 'tap';

dir.readFiles('./ui-components', runTestsOnFolder);

function runTestsOnFolder(err, content, fileName, next){
  if(err) throw err;

  const ast = acorn.parse(content, {
    allowImportExportEverywhere: true
  });
  test(fileName + ': shouldn\'t use constructor functions, use classes instead', (t) => {
    t.plan(1);
    t.equal(findNode(ast, isConstructor), false);
  });

  test(fileName + ': shouldn\'t use arguments object, use rest operator instead', (t) => {
    t.plan(1);
    t.equal(findNode(ast, isArgumentsIdentifier), false);
  });

  test(fileName + ': shouldn\'t use var statement, use let or const instead', (t) => {
    t.plan(1);
    t.equal(findNode(ast, isVarStatement), false);
  });

  test(fileName + ': shouldn\'t use this on the right side of a variable declaration', (t) => {
    t.plan(1);
    t.equal(findNode(ast, isVariableDeclarationWithThis), false);
  });

  test(fileName + ': shouldn\'t use apply, use spread operator instead', (t) => {
    t.plan(1);
    t.equal(findNode(ast, isApplyInvocation), false);
  });

  test(fileName + ': shouldn\'t use assignments with default values, use default parameters instead', (t) => {
    t.plan(1);
    t.equal(findNode(ast, isAssigmentWithDefault), false);
  });

  test(fileName + ': shouldn\'t use for..in, use for..of instead', (t) => {
    t.plan(1);
    t.equal(findNode(ast, isForInStatement), false);
  });

  test(fileName + ': shouldn\'t use for, use for...of instead', (t) => {
    t.plan(1);
    t.equal(findNode(ast, isForStatement), false);
  });

  test(fileName + ': shouldn\'t use forEach, use for...of instead', (t) => {
    t.plan(1);
    t.equal(findNode(ast, isForEachInvocation), false);
  });
  next();
}

function findNode(ast, filter) {
    var found = false;
    estraverse.traverse(ast, {
        enter: function (node, parent) {
            if (node && filter(node)) {
                found = true;
                this.break();
            }
        }
    });
    return found;
}

function isVarStatement(node) {
  return (node.type === 'VariableDeclaration' && node.kind === 'var');
}

function isArgumentsIdentifier(node) {
  return node.type === 'Identifier' && node.name === 'arguments';
}


function isConstructor(node){
  return node.type === 'FunctionDeclaration' && node.id.name[0] === node.id.name[0].toUpperCase();
}

function isVariableDeclarationWithThis(node) {
  return node.type === 'VariableDeclarator' && node.init.type === 'ThisExpression';
}

function isApplyInvocation(node) {
  // TODO check arguments for literal
  // otherwise it couldn't be replaced by the spread operator
  return node.type === 'MemberExpression'
      && node.property
      && node.property.name === 'apply';
}

function isForEachInvocation(node) {
  return node.type === 'MemberExpression'
      && node.property
      && node.property.name === 'forEach';
}

function isForStatement(node) {
  return node.type === 'ForStatement';
}

function isForInStatement(node) {
  return node.type === 'ForInStatement';
}

function isAssigmentWithDefault(node) {
  //TODO check it's being done inside a FunctionDeclaration or a FunctionExpression
  return node.type === 'VariableDeclarator'
      && node.init
      && node.init.type === 'LogicalExpression'
      && node.init.operator === '||';
}