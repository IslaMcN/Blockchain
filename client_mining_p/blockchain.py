import hashlib
import json
from time import time
from uuid import uuid4
from flask import Flask, jsonify, request

class Blockchain(object):
    def __init__(self):
        self.chain = []
        self.current_transactions = []

        # Genesis Block
        self.new_block(previous_hash=1, proof=100)

    def new_block(self, proof, previous_hash=None):
        block = {
            'index': len(self.chain) + 1,
            'timestamp': time(),
            'transactions': self.current_transactions,
            'proof': proof,
            'previous_hash': previous_hash or self.hash(self.last_block)
        }

        # Resets the current list of transactions
        self.current_transactions = []
        # Append the chain to the block
        self.chain.append(block)
        #Return new block
        return block

    def hash(self, block):
        # json.dumps converts json into a string aka JS's Stringify
        # sort_keys = true turns them into strings but keeps them sorted
        string_block = json.dumps(block, sort_keys=True)

        # Hashlib sha256 requires a 'bytes-like' object, which is what encode does
        raw_hash = hashlib.sha256(string_block.encode())

        # Sha256 returns the hash in a raw string that will include escaped characters.
        # Hexdigest converts the hash to a string with hexidecimal character, which is easier to work with and understand.
        hex_hash = raw_hash.hexdigest()    

        return hex_hash

    @property
    def last_block(self):
        return self.chain[-1]

    # def proof_of_work(self, block):
    #     block_string = json.dumps(block, sort_keys=True)
    #     proof = 0
    #     while self.valid_proof(block_string,proof) is False:
    #         proof += 1
    #     return proof

    @staticmethod
    def valid_proof(block_string, proof):
        guess = f'{block_string}{proof}'.encode()
        guess_hash = hashlib.sha256(guess).hexdigest()
        return guess_hash[:6] == "000000"

    # Create our node
app = Flask(__name__)

    # Create a globally unique address for this node
node_identifier = str(uuid4()).replace('-', '')

    # Create the Blockchain
blockchain = Blockchain()

@app.route('/mine', methods=['POST'])
def mine():
        # Run the proof of work to get the next proof
    
    #     # Make the new block by adding it to the chain with the proof 
    # 

    # response ={
    #     'new_block': block
    # }

    # return jsonify(response), 200
       
    #Use data = request.get_json() to pull data from POST
            # Don't confuse request and requests
    data = request.get_json()

    required = ['proof', 'id']
    if not all(k in data for k in required):
        response = {
            'message': 'Missing values'
        }
        return jsonify(response), 400
    submitted_proof = data['proof']

    block_string = json.dumps(blockchain.last_block, sort_keys=True)
    #If proof = correct:
    if blockchain.valid_proof(block_string, submitted_proof):
        previous_hash = blockchain.hash(blockchain.last_block)
        block = blockchain.new_block(submitted_proof, previous_hash)
        #Accept POST
        response = {
            'message': 'success'
        }
        return jsonify(response), 200
     # If proof and id are not there
    else:
        #Return a 400 error with jsonify
        response = {
            'message': 'Proof invalid or late'
        }
        return jsonify(response), 201
        


@app.route('/chain', methods=['GET'])
def full_chain():
    response = {
        'chain': blockchain.chain,
        'length': len(blockchain.chain)
    }
    return jsonify(response), 200

@app.route('/last_block', methods=['GET'])
def prev_block():
    response= {
        'last_block': blockchain.last_block
    }
    return jsonify(response), 200
    
    # Run program
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)